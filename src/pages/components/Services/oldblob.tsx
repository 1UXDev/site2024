import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import styles from "./Blob.module.css";

export function Blob({ selectedId }) {
  const meshRef = useRef();

  const { scale, rotation } = useSpring({
    from: { scale: 1, rotation: [0, 0, 0] },
    scale: selectedId === 1 ? 1.5 : 1, // Example conditional scaling
    rotation: selectedId === 1 ? [Math.PI, 0, 0] : [0, Math.PI, 0],
    config: { mass: 5, tension: 400, friction: 40 },
  });

  const [map, normalMap] = useLoader(TextureLoader, [
    "NormalMap2.png",
    "NormalMap.png",
  ]);

  useFrame(() => {
    const t = meshRef.current;
    if (t) {
      t.rotation.x = rotation.get()[0];
      t.rotation.y = rotation.get()[1];
      t.rotation.z = rotation.get()[2];
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale.to((s) => [s, s, s])}
      rotation-x={rotation.to((r) => r[0])}
      rotation-y={rotation.to((r) => r[1])}
      rotation-z={rotation.to((r) => r[2])}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={map} normalMap={normalMap} />
    </animated.mesh>
  );
}

export default function Scene({ selectedId }) {
  return (
    <Canvas className={styles.blobCanvas}>
      <ambientLight intensity={1.25} />
      <pointLight position={[-10, 10, 10]} intensity={1.5} />
      <Blob selectedId={selectedId} />
    </Canvas>
  );
}
