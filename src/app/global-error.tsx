'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalErrorBoundary]', error);
  }, [error]);

  return (
    <html lang="uz">
      <body style={{ margin: 0, background: '#050807', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
          <section
            style={{
              maxWidth: 560,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              padding: 32,
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#5eead4', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>FullFocus</p>
            <h1 style={{ fontSize: 32, lineHeight: 1.15, margin: 0 }}>Sahifani ochib bo&apos;lmadi</h1>
            <p style={{ color: '#a1a1aa', lineHeight: 1.7, marginTop: 16 }}>
              Vaqtinchalik xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko&apos;ring.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 28,
                border: 0,
                borderRadius: 8,
                background: '#5eead4',
                color: '#050807',
                cursor: 'pointer',
                fontWeight: 700,
                padding: '12px 20px',
              }}
            >
              Qayta urinish
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
