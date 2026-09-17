# Custom Domain Operations — sitenerve.online

Last verified: 2026-09-17

## Summary

`sitenerve.online` is fully delegated to **Vercel's own nameservers** (not
Hostinger DNS). Hostinger is the registrar only; it no longer serves any DNS
records for this zone. All A/CNAME/SSL records live inside the Vercel
project's DNS tab and are managed automatically by Vercel.

As of this writing, the configuration is correct end-to-end (registrar →
nameservers → DNS records → Vercel project → SSL). The intermittent
`ERR_CONNECTION_RESET` / resolution failures observed are DNS-answer
reliability blips, not a misconfiguration — see "Known failure symptoms"
below before changing anything.

## Final authoritative nameservers

Set at the registrar (Hostinger → Domains → sitenerve.online → DNS/Nameservers):

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Confirmed matching via registrar panel, and via NS lookups against 8.8.8.8
and 1.1.1.1. Do not change these back to Hostinger's default nameservers —
doing so would break the DNS records below, which only exist inside Vercel's
nameserver-managed zone.

## Final Vercel domain settings

Project: `sitenerve` (team: Takshil's projects / `taxilj`)

| Domain | Status | Environment |
|---|---|---|
| `sitenerve.online` | Valid Configuration | Production |
| `www.sitenerve.online` | Valid Configuration | 308 redirect → `sitenerve.online` |
| `sitenerve.vercel.app` | Valid Configuration | Production |

Both custom domains are connected only to the `sitenerve` project — not
attached to any other Vercel project.

## Final apex DNS record

```
Type: A
Name: @ (sitenerve.online)
Value: 216.198.79.1
TTL: 60
Created: 2026-09-12
```

## Final www DNS record

```
Type: CNAME
Name: www
Value: 7ffc622a671de2a4.vercel-dns-017.com.
TTL: 60
Created: 2026-09-12
```

Also present: a CAA record (`0 issue "pki.goog"`) permitting Google/Vercel's
CA to issue certificates for the zone. Do not remove it.

## Canonical redirect behavior

`www.sitenerve.online` → `https://sitenerve.online` via a Vercel-managed 308
permanent redirect, configured entirely in the Vercel domain settings (no
app code involved — there is no `middleware.ts` or `vercel.json` in this
repo, and `next.config.ts` has no host-based redirect/rewrite logic).
`sitenerve.online` is the canonical domain.

## SSL status

Two managed certificates on file, both auto-renewing:

- `cert_RmRJ24h1CnzXTirhHhsqjb2S` — covers `*.sitenerve.online` and
  `sitenerve.online`, issued 2026-09-12, renews ~2026-12-11.
- `cert_OYAKR3vmbVJgdToObFZGpn6d` — covers `sitenerve.online`, issued
  2026-08-08, renews ~2026-11-06.

Both are Vercel-managed ("Auto" renewal) — no manual action required.

## How to verify the domain

```bash
# DNS (use a public resolver, not just your local one)
nslookup -type=A sitenerve.online 8.8.8.8
nslookup -type=CNAME www.sitenerve.online 8.8.8.8

# HTTP behavior
curl -I -L --max-time 20 https://sitenerve.online/       # expect 200
curl -I -L --max-time 20 https://www.sitenerve.online/    # expect redirect -> sitenerve.online -> 200
curl -I --max-time 20 http://sitenerve.online/            # expect redirect to https

# Or run the repo's own health check
node scripts/check-domain-health.mjs
```

Also check `vercel.com/<team>/sitenerve/~/domains/sitenerve.online` — the
"Current DNS Records" and "SSL Certificates" tables there are the source of
truth for this zone (Hostinger's DNS tab is not, since nameservers point
away from it).

## Known failure symptoms and root causes

| Symptom | Likely cause | Action |
|---|---|---|
| `sitenerve.vercel.app` loads, `sitenerve.online` doesn't | Custom domain DNS issue — isolate separately, don't assume app/code bug | Check DNS records above first |
| DNS lookups from `nslookup`/`Resolve-DnsName` time out intermittently, but `dns.google/resolve` (DoH) succeeds | Low 60s TTL means every query is a fresh authoritative lookup; simple stub resolvers give up faster than DNS-over-HTTPS services with retry logic. Normal in the days after switching to Vercel nameservers. | Retest with a public DoH endpoint or wait; do not edit DNS records based on a single failed `nslookup` |
| Browser shows `ERR_CONNECTION_RESET` | Usually a stale cached DNS answer (old IP) from before the Sep 12 2026 nameserver switch, or a transient reset from your local network/ISP path | Flush local DNS cache (`ipconfig /flushdns` on Windows), hard-refresh, retest from a different network (mobile hotspot) |
| Domain shows "Invalid Configuration" in Vercel | Real misconfiguration | Compare against "Final Vercel domain settings" above and fix in Vercel, not Hostinger |

## Records that must never be deleted (email-related)

This zone currently has no MX/SPF/DKIM/DMARC records visible in the Vercel
DNS tab as of 2026-09-17. If any are added later (e.g. for
`@sitenerve.online` email), do not delete or modify MX, TXT (SPF/DKIM/DMARC)
records without explicit confirmation that they're incorrect — breaking
these breaks mail delivery, not the website.

## Safe recovery steps

1. Never re-point nameservers back to Hostinger's defaults — that orphans
   the A/CNAME/CAA records living in Vercel's zone.
2. If a domain shows "Invalid Configuration" in Vercel, use the exact
   value Vercel's dashboard displays at that moment — Vercel's recommended
   apex IP has changed over time (this zone uses `216.198.79.1`); don't
   reuse an old IP from memory or an old guide.
3. Before changing any DNS record, record the current zone (Vercel →
   Domains → `sitenerve.online` → DNS Records table) so you can revert.
4. If SSL shows "invalid" or expired, check the CAA record wasn't removed
   — a CAA record restricting issuers will silently break Vercel's
   auto-renewal if it doesn't allow Vercel's CA.
