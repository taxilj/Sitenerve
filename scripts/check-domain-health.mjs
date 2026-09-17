#!/usr/bin/env node
// Verifies sitenerve.online's custom-domain setup is still healthy.
// See docs/custom-domain-operations.md for the config this checks against.

const APEX = "https://sitenerve.online/";
const WWW = "https://www.sitenerve.online/";

async function check(url, { expectRedirectTo } = {}) {
  let res;
  try {
    res = await fetch(url, { redirect: "manual" });
  } catch (err) {
    const code = err.cause?.code ?? err.code ?? "UNKNOWN";
    throw new Error(`${url} -> connection failed (${code}): ${err.message}`);
  }

  if (expectRedirectTo) {
    const location = res.headers.get("location") ?? "";
    const ok = (res.status === 301 || res.status === 308) && location.startsWith(expectRedirectTo);
    if (!ok) {
      throw new Error(
        `${url} -> expected 301/308 redirect to ${expectRedirectTo}, got status ${res.status}, location "${location}"`
      );
    }
    console.log(`OK  ${url} -> ${res.status} -> ${location}`);
    return;
  }

  if (res.status !== 200) {
    throw new Error(`${url} -> expected 200, got ${res.status}`);
  }
  // A 200 over https:// here means TLS already completed successfully (fetch throws on cert errors).
  console.log(`OK  ${url} -> ${res.status} (TLS valid)`);
}

async function main() {
  const failures = [];

  for (const task of [
    () => check(APEX),
    () => check(WWW, { expectRedirectTo: "https://sitenerve.online" }),
  ]) {
    try {
      await task();
    } catch (err) {
      failures.push(err.message);
      console.error(`FAIL ${err.message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} check(s) failed.`);
    process.exit(1);
  }

  console.log("\nAll domain health checks passed.");
}

main();
