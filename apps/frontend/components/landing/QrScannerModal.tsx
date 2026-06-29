'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface DetectedBarcode {
  rawValue: string;
}
interface BarcodeDetectorLike {
  detect(source: CanvasImageSource): Promise<DetectedBarcode[]>;
}
declare global {
  interface Window {
    BarcodeDetector?: new (opts?: { formats?: string[] }) => BarcodeDetectorLike;
  }
}

type ScanError = 'unsupported' | 'denied' | null;

/**
 * Lightweight in-page QR scanner: opens the rear camera and reads a 6-character event code via the
 * native BarcodeDetector API (no library, so no bundle cost). Lazy-loaded by JoinStrip, so it only
 * ships when the user taps "Scan". Browsers without BarcodeDetector get a graceful fallback.
 */
export function QrScannerModal({
  onDetect,
  onClose,
}: {
  onDetect: (code: string) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<ScanError>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    async function start() {
      const Detector = typeof window !== 'undefined' ? window.BarcodeDetector : undefined;
      if (!Detector || !navigator.mediaDevices?.getUserMedia) {
        setError('unsupported');
        return;
      }

      let detector: BarcodeDetectorLike;
      try {
        detector = new Detector({ formats: ['qr_code'] });
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
      } catch {
        if (!stopped) setError('denied');
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

      const tick = async () => {
        if (stopped || !videoRef.current) return;
        try {
          const codes = await detector.detect(videoRef.current);
          const match = codes[0]?.rawValue.toUpperCase().match(/[A-Z0-9]{6}/);
          if (match) {
            onDetect(match[0]);
            return;
          }
        } catch {
          /* ignore per-frame detect errors */
        }
        timer = setTimeout(tick, 250);
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

      {error ? (
        <div className="max-w-xs text-center text-white">
          <p className="font-heading text-lg font-bold">
            {error === 'denied' ? 'Camera blocked' : 'Scanning not supported'}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {error === 'denied'
              ? 'Allow camera access in your browser, or type the 6-character code instead.'
              : 'This browser can’t scan in-page — type the 6-character code instead.'}
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
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-white/70" />
          </div>
          <p className="mt-5 text-center text-sm text-white/80">
            Point your camera at the event QR code
          </p>
        </>
      )}
    </div>
  );
}
