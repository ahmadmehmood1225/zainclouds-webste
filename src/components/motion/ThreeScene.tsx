"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useCapabilities } from "@/lib/animations/motion";
import { cn } from "@/lib/cn";

type ThreeSceneProps = {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  dpr?: [number, number];
};

/**
 * Capability-aware boundary around a three.js canvas.
 *
 * Guards WebGL behind the same quality rules used across the site: nothing
 * renders under reduced motion, expensive scenes are capped on low power
 * devices, and a non-WebGL fallback can be provided. It is meant to be loaded
 * with next/dynamic(ssr: false) so WebGL never blocks first paint.
 */
export function ThreeScene({
  children,
  className,
  fallback,
  camera = { position: [0, 0, 6.2], fov: 45 },
  dpr = [1, 1.75],
}: ThreeSceneProps) {
  const { reduced, low } = useCapabilities();

  if (reduced) return fallback ?? null;

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas
        camera={{ position: camera.position ?? [0, 0, 6.2], fov: camera.fov ?? 45 }}
        dpr={[dpr[0], low ? Math.min(dpr[1], 1.5) : dpr[1]]}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <directionalLight position={[-5, -3, 2]} intensity={0.45} color="#84b7f0" />
        <Suspense fallback={null}>{children}</Suspense>
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}