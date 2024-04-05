import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

import styles from "./Blob.module.css";

function Blob() {
  const meshRef = useRef();
  const simplex = createNoise3D();
  const originalPositions = useRef();

  const geometry = useMemo(() => new THREE.SphereGeometry(1.5, 256, 256), []);

  // const gradientTexture = textureLoader.load("/pic.jpg");
  const [displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    ["NormalMap.png", "pic.png", "NormalMap.png", "NormalMap2.png"]
  );

  useMemo(() => {
    const colorsArray = [];
    const colorStops = [
      { stop: 0, color: new THREE.Color("#c16507") },
      { stop: 0.25, color: new THREE.Color("#dc373c") },
      { stop: 0.5, color: new THREE.Color("#de0075") },
      { stop: 0.75, color: new THREE.Color("#b420b6") },
      { stop: 1, color: new THREE.Color("#1253eb") },
    ];

    geometry.computeBoundingBox();
    const minZ = geometry.boundingBox.min.z;
    const maxZ = geometry.boundingBox.max.z;
    const rangeZ = maxZ - minZ;

    const positionAttribute = geometry.getAttribute("position");
    for (let i = 0; i < positionAttribute.count; i++) {
      const z = positionAttribute.getZ(i);
      const t = (z - minZ) / rangeZ; // Normalized [0, 1] along Z

      // Find the two color stops t falls between
      let startIndex = 0;
      let endIndex = colorStops.length - 1;
      for (let j = 0; j < colorStops.length - 1; j++) {
        if (t >= colorStops[j].stop && t <= colorStops[j + 1].stop) {
          startIndex = j;
          endIndex = j + 1;
          break;
        }
      }

      // Calculate local normalized value (0-1) between these two stops
      const localT =
        (t - colorStops[startIndex].stop) /
        (colorStops[endIndex].stop - colorStops[startIndex].stop);

      // Interpolate the color
      const color = colorStops[startIndex].color
        .clone()
        .lerp(colorStops[endIndex].color, localT);

      colorsArray.push(color.r, color.g, color.b);
    }

    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsArray, 3)
    );
  }, [geometry]);

  useMemo(() => {
    originalPositions.current = Float32Array.from(
      geometry.attributes.position.array
    );
  }, [geometry]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * -0.15;
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.z = time * -0.1;

    const positions = meshRef.current.geometry.attributes.position;
    let pX, pY, pZ, noise;
    let displacementArray = [];

    // Conterols
    const noiseScale = 0.8; // frequency
    const noiseAmplitude = 1.5; // amplitude
    const displacementScale = 0.1; // displacement effect

    for (let i = 0; i < positions.count; i++) {
      pX = originalPositions.current[i * 3];
      pY = originalPositions.current[i * 3 + 1];
      pZ = originalPositions.current[i * 3 + 2];

      // Increase frequency by scaling
      noise =
        simplex(
          pX * noiseScale,
          pY * noiseScale,
          pZ * noiseScale + time * 0.35
        ) * noiseAmplitude;

      const displacement =
        Math.sin(noise * 1.5 + time * 0.2) * displacementScale;
      displacementArray.push(displacement);
    }

    // adjusted displacement
    for (let i = 0; i < positions.count; i++) {
      const displacement = displacementArray[i];
      pX = originalPositions.current[i * 3];
      pY = originalPositions.current[i * 3 + 1];
      pZ = originalPositions.current[i * 3 + 2];

      let v = new THREE.Vector3(pX, pY, pZ).normalize();
      v.multiplyScalar(displacement);

      positions.setXYZ(i, pX + v.x, pY + v.y, pZ + v.z);
    }

    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        vertexColors
        roughness={0.2}
        metalness={0.25}
        normalMap={normalMap}
        displacementMap={displacementMap}
      ></meshStandardMaterial>
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      className={styles.blobCanvas}
      style={{ width: "30vh", height: "30vh" }}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
      <pointLight position={[1, 1, 2]} castShadow intensity={3} />
      <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />

      <Blob />
    </Canvas>
  );
}
