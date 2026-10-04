"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { BusinessNetwork } from "@/components/three/BusinessNetwork";
import { useCapabilities } from "@/lib/animations/motion";

/**
 * Signature hero visual. WebGL is loaded dynamically (via next/dynamic with
 * ssr:false) so it never blocks first render; on small screens or when reduced
 * motion is set the canvas is skipped entirely and the static hero background
 * shows instead.
 */
export function HeroScene() {
  const { reduced, low } = useCapabilities();
  const [desktop, setDesktop] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const frame = requestAnimationFrame(() => setDesktop(mq.matches));
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {desktop && (
        <Canvas
          camera={{ position: [0, 0.1, 8.6], fov: 42 }}
          dpr={[1, low ? 1.5 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 7, 4]} intensity={1.15} />
          <directionalLight position={[-6, -3, 3]} intensity={0.5} color="#84b7f0" />
          <Suspense fallback={null}>
            <BusinessNetwork
              accent="green"
              quality={low ? "low" : "high"}
              rotationSpeed={reduced ? 0 : 0.05}
              packets={!reduced}
              pointer={pointer}
              static={reduced}
            />
          </Suspense>
          <AdaptiveDpr pixelated={false} />
        </Canvas>
      )}
    </div>
  );
}