'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import jsQR from 'jsqr';

type Status = 'starting' | 'scanning' | 'denied' | 'nocamera' | 'unsupported';

/**
 * In-page QR scanner: opens the rear camera and decodes a 6-character event code with jsQR (a
 * tiny, cross-browser decoder — works on desktop too, unlike the native BarcodeDetector API).
 * Lazy-loaded by JoinStrip, so neither this nor jsQR is in the initial bundle.
 */
export function QrScannerModal({
  onDetect,
  onClose,
}: {
  onDetect: (code: string) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('starting');

  useEffect(() => {
    let stream: MediaStream | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia || !ctx) {
        setStatus('unsupported');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
      } catch (e) {
        if (stopped) return;
        const name = e instanceof DOMException ? e.name : '';
        setStatus(name === 'NotFoundError' || name === 'OverconstrainedError' ? 'nocamera' : 'denied');
        return;
      }
      if (stopped) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      try {
        await video.play();
      } catch {
        /* muted + playsInline still plays even if the promise rejects */
      }
      setStatus('scanning');

      const tick = () => {
        if (stopped) return;
        const v = videoRef.current;
        if (v && v.videoWidth > 0) {
          canvas.width = v.videoWidth;
          canvas.height = v.videoHeight;
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = jsQR(data, width, height, { inversionAttempts: 'dontInvert' });
          const match = result?.data.toUpperCase().match(/[A-Z0-9]{6}/);
          if (match) {
            onDetect(match[0]);
            return;
          }
        }
        timer = setTimeout(tick, 200);
      };
      tick();
    }

    start();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onDetect]);

  const isError = status === 'denied' || status === 'nocamera' || status === 'unsupported';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scan QR code"
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close scanner"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      {isError ? (
        <div className="max-w-xs text-center text-white">
          <p className="font-heading text-lg font-bold">
            {status === 'denied'
              ? 'Camera blocked'
              : status === 'nocamera'
                ? 'No camera found'
                : 'Camera not available'}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {status === 'denied'
              ? 'Allow camera access in your browser, then try again — or type the 6-character code instead.'
              : status === 'nocamera'
                ? 'We couldn’t find a camera on this device. Type the 6-character code instead.'
                : 'This browser can’t open the camera here. Type the 6-character code instead.'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-primary"
          >
            Enter code instead
          </button>
        </div>
      ) : (
        <>
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-black">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-white/70" />
            {status === 'starting' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-sm">Starting camera…</span>
              </div>
            )}
          </div>
          <p className="mt-5 text-center text-sm text-white/80">
            Point your camera at the event QR code
          </p>
        </>
      )}
    </div>
  );
}
