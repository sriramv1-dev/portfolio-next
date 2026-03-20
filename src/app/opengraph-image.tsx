import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sriram Voonna | Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <div style={{
          fontSize: 80,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-2px',
        }}>
          Sriram Voonna
        </div>
        <div style={{
          fontSize: 36,
          color: '#4ade80',
          fontWeight: 400,
        }}>
          Full Stack Developer / Javascript
        </div>
        <div style={{
          fontSize: 24,
          color: '#888888',
          marginTop: 8,
        }}>
          React · TypeScript · Node.js
        </div>
      </div>
    ),
    { ...size }
  );
}
