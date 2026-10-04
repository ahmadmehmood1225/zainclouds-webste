"use client";

import { BusinessNetwork, type NetworkAccent } from "@/components/three/BusinessNetwork";
import { ThreeScene } from "@/components/motion/ThreeScene";
import { useCapabilities } from "@/lib/animations/motion";

type ServiceSceneProps = {
  accent: NetworkAccent;
};

/**
 * Compact single-canvas visual for the interactive services showcase. The
 * active service reconfigures the shared network system (color, emphasis)
 * without remounting WebGL.
 */
export function ServiceScene({ accent }: ServiceSceneProps) {
  const { reduced, low } = useCapabilities();

  return (
    <ThreeScene
      fallback={null}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
    >
      <BusinessNetwork
        accent={accent}
        quality={low ? "low" : "high"}
        rotationSpeed={0.045}
        packets={!reduced}
      />
    </ThreeScene>
  );
}