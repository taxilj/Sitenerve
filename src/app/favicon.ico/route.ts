import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Serve the logo.jpeg as favicon
    const logoPath = path.join(process.cwd(), 'public', 'logo.jpeg');
    const logoBuffer = fs.readFileSync(logoPath);
    
    return new NextResponse(logoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Favicon not found', { status: 404 });
  }
}