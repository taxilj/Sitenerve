import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Serve the SiteNerve icon mark as favicon
    const iconPath = path.join(process.cwd(), 'public', 'brand', 'sitenerve-icon.png');
    const iconBuffer = fs.readFileSync(iconPath);

    return new NextResponse(iconBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Favicon not found', { status: 404 });
  }
}