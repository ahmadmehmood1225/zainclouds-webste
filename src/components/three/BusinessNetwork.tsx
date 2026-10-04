"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Line } from "@react-three/drei";

export type NetworkAccent = "green" | "pink" | "yellow" | "navy";

export const ACCENT_HEX: Record<NetworkAccent, string> = {
  green: "#4cb585",
  pink: "#ef5790",
  yellow: "#ffc743",
  navy: "#6d8ec1",
};

type NodeGeo = "cube" | "octa" | "ico" | "sphere" | "cone";

const CORE_NODES = [
  { slot: [0.0, 0.55, 2.3] as const, geo: "cube" as NodeGeo, size: 0.17 },
  { slot: [-1.99, -0.45, 1.15] as const, geo: "octa" as NodeGeo, size: 0.15 },
  { slot: [-1.99, 0.45, -1.15] as const, geo: "ico" as NodeGeo, size: 0.15 },
  { slot: [0.0, -0.55, -2.3] as const, geo: "cone" as NodeGeo, size: 0.15 },
  { slot: [1.99, -0.45, -1.15] as const, geo: "sphere" as NodeGeo, size: 0.14 },
  { slot: [1.99, 0.45, 1.15] as const, geo: "octa" as NodeGeo, size: 0.15 },
];

const SATELLITES = [
  { slot: [3.15, 1.35, 0.0] as const, geo: "ico" as NodeGeo, size: 0.22 },
  { slot: [-3.15, -1.25, 0.4] as const, geo: "cube" as NodeGeo, size: 0.19 },
];

function buildParticles(count: number) {
  const arr = new Float32Array(count * 3);
  let index = 0;
  for (let i = 0; i < count; i += 1) {
    const radius = 2.5 + Math.random() * 2.7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[index++] = radius * Math.sin(phi) * Math.cos(theta);
    arr[index++] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
    arr[index++] = radius * Math.cos(phi);
  }
  return arr;
}

const PARTICLES: Record<"high" | "low", Float32Array> = {
  high: buildParticles(420),
  low: buildParticles(170),
};

function NodeGeometry({ geo, size }: { geo: NodeGeo; size: number }) {
  switch (geo) {
    case "cube":
      return <boxGeometry args={[size, size, size]} />;
    case "octa":
      return <octahedronGeometry args={[size, 0]} />;
    case "ico":
      return <icosahedronGeometry args={[size, 0]} />;
    case "cone":
      return <coneGeometry args={[size, size * 1.7, 6]} />;
    default:
      return <sphereGeometry args={[size, 20, 20]} />;
  }
}

type BusinessNetworkProps = {
  accent?: NetworkAccent;
  quality?: "high" | "low";
  rotationSpeed?: number;
  packets?: boolean;
  pointer?: { current: { x: number; y: number } };
  static?: boolean;
};

/**
 * Shared abstract visual: a glowing core surrounded by business system nodes
 * linked by data lines, orbiting packets and a sparse particle shell. One
 * system, reconfigured per context — hero and service showcases both render it.
 */
export function BusinessNetwork({
  accent = "green",
  quality = "high",
  rotationSpeed = 0.05,
  packets = true,
  pointer,
  static: isStatic = false,
}: BusinessNetworkProps) {
  const group = useRef<THREE.Group | null>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

  const positions = useMemo(
    () => CORE_NODES.map((n) => new THREE.Vector3(...n.slot)),
    [],
  );

  const color = useMemo(() => new THREE.Color(ACCENT_HEX[accent]), [accent]);
  const targetColor = useMemo(() => new THREE.Color(ACCENT_HEX[accent]), [accent]);

  const packetSeed = useMemo(() => {
    const seeds: number[] = [];
    for (let i = 0; i < CORE_NODES.length; i += 1) seeds.push(i / CORE_NODES.length);
    return seeds;
  }, []);

  const particles = PARTICLES[quality];

  const hasLines = quality === "high";

  useFrame((state, delta) => {
    if (isStatic) return;
    const t = state.clock.elapsedTime;

    color.lerp(targetColor, 0.05);

    if (group.current) {
      group.current.rotation.y += delta * rotationSpeed;
      const px = pointer?.current?.x ?? 0;
      const py = pointer?.current?.y ?? 0;
      group.current.rotation.x += (py * 0.14 - group.current.rotation.x) * 0.03;
      group.current.rotation.z += (px * 0.08 - group.current.rotation.z) * 0.03;
    }

    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const scale = 1 + Math.sin(t * 1.5 + i * 1.25) * 0.12;
      mesh.scale.setScalar(scale);
      mesh.rotation.y += delta * 0.45;
      mesh.rotation.x = Math.sin(t * 0.5 + i) * 0.18;
    });

    if (packets) {
      packetRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        let p = packetSeed[i];
        p = (p + delta * (0.16 + i * 0.018)) % 1;
        packetSeed[i] = p;
        const from = new THREE.Vector3();
        const to = positions[i];
        mesh.position.lerpVectors(from, to, p);
        mesh.position.y += 0.12;
      });
    }
  });

  return (
    <group rotation={[0.05, 0, 0]}>
      <group ref={group}>
        {/* Core */}
        <mesh>
          <icosahedronGeometry args={[0.82, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.34}
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.1}
            roughness={0.32}
            metalness={0.18}
          />
        </mesh>
        <pointLight color="#8df0c0" intensity={1.4} distance={9} decay={2} />

        {/* Orbit rings */}
        <mesh rotation={[Math.PI / 2.15, 0, 0.4]}>
          <torusGeometry args={[2.55, 0.008, 8, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
        <mesh rotation={[1.18, 0.35, 0]}>
          <torusGeometry args={[1.85, 0.006, 8, 110]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.07} />
        </mesh>

        {/* Core links */}
        {CORE_NODES.map((_, i) => (
          <Line
            key={`line-${i}`}
            points={[
              [0, 0, 0],
              [CORE_NODES[i].slot[0], CORE_NODES[i].slot[1], CORE_NODES[i].slot[2]],
            ]}
            color="#ffffff"
            transparent
            opacity={hasLines ? 0.2 : 0.12}
            lineWidth={1}
          />
        ))}
        {hasLines &&
          SATELLITES.map((_, i) => (
            <Line
              key={`sline-${i}`}
              points={[
                [0, 0, 0],
                [SATELLITES[i].slot[0], SATELLITES[i].slot[1], SATELLITES[i].slot[2]],
              ]}
              color="#ffffff"
              transparent
              opacity={0.1}
              lineWidth={1}
            />
          ))}

        {/* System nodes */}
        {CORE_NODES.map((node, i) => (
          <mesh
            key={`node-${i}`}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            position={[node.slot[0], node.slot[1], node.slot[2]]}
          >
            <NodeGeometry geo={node.geo} size={node.size} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.62}
              roughness={0.32}
              metalness={0.18}
            />
          </mesh>
        ))}

        {/* High orbit satellites */}
        {hasLines &&
          SATELLITES.map((node, i) => (
            <mesh key={`sat-${i}`} position={[node.slot[0], node.slot[1], node.slot[2]]}>
              <NodeGeometry geo={node.geo} size={node.size} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                roughness={0.35}
              />
            </mesh>
          ))}

        {/* Travelling data packets */}
        {packets &&
          CORE_NODES.map((_, i) => (
            <mesh key={`packet-${i}`} ref={(el) => (packetRefs.current[i] = el)}>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshBasicMaterial color="#c8ffe6" transparent opacity={0.9} toneMapped={false} />
            </mesh>
          ))}

        {/* Particle shell */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.022}
            sizeAttenuation
            color="#7ecea9"
            transparent
            opacity={0.55}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {!isStatic && quality === "high" ? (
        <ContactShadows
          position={[0, -2.35, 0]}
          opacity={0.5}
          scale={11}
          blur={2.6}
          far={3.4}
          frames={1}
          resolution={256}
          color="#000000"
        />
      ) : null}
    </group>
  );
}