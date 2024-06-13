import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

import styles from "./Blob.module.css";

function Blob({ selectedId }: { selectedId: number }) {
  const [amplitude, setAmplitude] = useState(1.5);
  const [frequency, setFrequency] = useState(0.8);
  const [displacementEffect, setDisplacementEffect] = useState(0.1);
  const [rotation, setRotation] = useState([0.1, 0.1, 0.1]);
  const [stateSphereGeometry, setStateSphereGeometry] = useState([1, 3, 3]);
  const [normalMapInput, setNormalMapInput] = useState("pic.png");
  const [displacementMapInput, setDisplacementMapInput] =
    useState("NormalMap.png");

  useEffect(() => {
    console.log(selectedId);
    if (selectedId === 0) {
      setAmplitude(0.7);
      setFrequency(0.2);
      setDisplacementEffect(0.15);
      setRotation([0.05, 0.05, 0.05]);
      setStateSphereGeometry([1, 3, 3]);
      setNormalMapInput("pic.png");
      setDisplacementMapInput("NormalMap.png");
    } else if (selectedId == 1) {
      setAmplitude(1);
      setFrequency(0.1);
      setDisplacementEffect(0.2);
      setRotation([-0.15, 0.15, 0.1]);
      setStateSphereGeometry([1.2, 7, 5]);
      setNormalMapInput("pic.png");
      setDisplacementMapInput("NormalMap.png");
    } else if (selectedId === 2) {
      setAmplitude(0.13);
      setFrequency(0.2);
      setDisplacementEffect(0.03);
      setRotation([-0.2, 0.2, 0.14]);
      setStateSphereGeometry([1.5, 256, 256]);
      setNormalMapInput("pic.png");
      setDisplacementMapInput("NormalMap.png");
    } else if (selectedId === 3) {
      setAmplitude(0.02);
      setFrequency(0.25);
      setDisplacementEffect(0);
      setNormalMapInput("NormalMap.png");
      setDisplacementMapInput("next.svg");
      setStateSphereGeometry([2, 128, 128]);
    } else {
      setAmplitude(1.5);
      setFrequency(0.8);
      setDisplacementEffect(0.1);
    }
  }, [selectedId]);

  const meshRef = useRef();
  const simplex = createNoise3D();
  const originalPositions = useRef();

  const geometry = useMemo(
    () =>
      new THREE.SphereGeometry(
        stateSphereGeometry[0],
        stateSphereGeometry[1],
        stateSphereGeometry[2]
      ),
    [stateSphereGeometry]
  );

  const [displacementMap, normalMap] = useLoader(TextureLoader, [
    displacementMapInput,
    normalMapInput,
  ]);

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
    meshRef.current.rotation.y = time * rotation[0];
    meshRef.current.rotation.x = time * rotation[1];
    meshRef.current.rotation.z = time * rotation[2];

    const positions = meshRef.current.geometry.attributes.position;
    let pX, pY, pZ, noise;
    let displacementArray = [];

    const noiseScale = frequency;
    const noiseAmplitude = amplitude;
    const displacementScale = displacementEffect;

    for (let i = 0; i < positions.count; i++) {
      pX = originalPositions.current[i * 3];
      pY = originalPositions.current[i * 3 + 1];
      pZ = originalPositions.current[i * 3 + 2];

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

export function Scene({ selectedId }: { selectedId: number }) {
  const [transitionAnimation, setTransitionAnimation] = useState(false);

  useEffect(() => {
    setTransitionAnimation(true);
    const timeout = setTimeout(() => {
      setTransitionAnimation(false);
    }, 210);
    return () => clearTimeout(timeout);
  }, [selectedId]);

  return (
    <Canvas
      className={`${styles.blobCanvas} ${
        transitionAnimation && styles.transitionAnimation
      }`}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
      <pointLight position={[1, 1, 2]} castShadow intensity={3} />
      <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />

      <Blob selectedId={selectedId} />
    </Canvas>
  );
}
