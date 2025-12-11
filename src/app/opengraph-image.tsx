import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'なんでBOX - 子どもたちの「なんで？」を楽しく解き明かす';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #dbeafe 0%, #fae8ff 100%)',
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 30,
            }}
          >
            <div
              style={{
                fontSize: 80,
                color: 'white',
              }}
            >
              💡
            </div>
          </div>
          <div
            style={{
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            なんでBOX
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#4b5563',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          子どもたちの「なんで？」を楽しく解き明かす
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
