// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import * as THREE from "three";
// import { createNoise3D } from "simplex-noise";
// import { animated, useSpring } from "@react-spring/three";
// import styles from "./Blob.module.css";

// function Blob({ selectedId }) {
//   const meshRef = useRef();
//   const simplex = createNoise3D();
//   const textureLoader = new TextureLoader();
//   const displacementMap = textureLoader.load("DisplacementMap.png");
//   const normalMap = textureLoader.load("NormalMap.png");
//   const roughnessMap = textureLoader.load("RoughnessMap.png");
//   const aoMap = textureLoader.load("AoMap.png");

//   const springProps = useSpring({
//     amplitude:
//       selectedId === 0
//         ? 0.7
//         : selectedId === 1
//         ? 2.5
//         : selectedId === 2
//         ? 0.375
//         : 0.1875,
//     frequency:
//       selectedId === 0
//         ? 0
//         : selectedId === 1
//         ? 0.1
//         : selectedId === 2
//         ? 0.2
//         : 0.1,
//     displacementEffect:
//       selectedId === 0
//         ? 0
//         : selectedId === 1
//         ? 0.2
//         : selectedId === 2
//         ? 0.025
//         : 0.0125,
//     rotation:
//       selectedId === 0
//         ? [0.2, 0.15, 1.05]
//         : selectedId === 1
//         ? [-0.15, 0.15, 0.1]
//         : [0.1, 0.1, 0.1],
//     sphereGeometry: selectedId === 1 ? [1.5, 7, 6] : [1, 3, 3],
//     config: { mass: 5, tension: 400, friction: 50 },
//   });
//   // Assuming springProps is already defined as shown previously:
//   const { amplitude, frequency, displacementEffect, rotation, sphereGeometry } =
//     springProps;

//   const geometry = useMemo(() => {
//     // Access the current value of sphereGeometry
//     const [radius, widthSegments, heightSegments] = sphereGeometry.get();

//     return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
//   }, [sphereGeometry]); // Here, sphereGeometry is a dependency as an animated object, not a value

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     const positions = meshRef.current.geometry.attributes.position;

//     // Ensure we're accessing values from springProps which hold the animated values
//     const currentFrequency = frequency.get();
//     const currentAmplitude = amplitude.get();
//     const currentDisplacementEffect = displacementEffect.get();

//     for (let i = 0; i < positions.count; i++) {
//       const ix = i * 3;
//       const iy = ix + 1;
//       const iz = ix + 2;

//       const originalX = positions.array[ix];
//       const originalY = positions.array[iy];
//       const originalZ = positions.array[iz];

//       const noise =
//         simplex(
//           originalX * currentFrequency,
//           originalY * currentFrequency,
//           originalZ * currentFrequency + time * 0.35
//         ) * currentAmplitude;

//       const displacement =
//         Math.sin(noise * 1.5 + time * 0.2) * currentDisplacementEffect;

//       positions.setXYZ(
//         i,
//         originalX + displacement,
//         originalY + displacement,
//         originalZ + displacement
//       );
//     }

//     positions.needsUpdate = true;
//   });

//   return (
//     <animated.mesh
//       ref={meshRef}
//       geometry={geometry}
//       rotation-x={rotation[0]}
//       rotation-y={rotation[1]}
//       rotation-z={rotation[2]}
//     >
//       <meshStandardMaterial
//         vertexColors
//         roughnessMap={roughnessMap}
//         normalMap={normalMap}
//         displacementMap={displacementMap}
//         aoMap={aoMap}
//       />
//     </animated.mesh>
//   );
// }

// export default function Scene({ selectedId }) {
//   return (
//     <Canvas
//       className={styles.blobCanvas}
//       style={{ aspectRatio: "1/1", maxHeight: "50vh", maxWidth: "50vh" }}
//     >
//       <ambientLight intensity={1.25} />
//       <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
//       <pointLight position={[1, 1, 2]} castShadow intensity={3} />
//       <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />
//       <Blob selectedId={selectedId} />
//     </Canvas>
//   );
// }

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

import { animated, useSpring } from "@react-spring/three";

import styles from "./Blob.module.css";

function Blob({ selectedId }: { selectedId: number }) {
  // States for the amplitude, frequency, and displacement effect
  const [amplitude, setAmplitude] = useState(1.5);
  const [frequency, setFrequency] = useState(0.8);
  const [displacementEffect, setDisplacementEffect] = useState(0.1);
  const [rotation, setRotation] = useState([0.1, 0.1, 0.1]);
  const [stateSphereGeometry, setStateSphereGeometry] = useState([1, 3, 3]);
  const [wasClicked, setWasClicked] = useState(false);

  const { morph, rotationSpeed, rotation } = useSpring({
    from: { morph: [1, 3, 3], rotationSpeed: 0.1, rotation: [0.1, 0.1, 0.1] },
    to: async (next, cancel) => {
      await next({ rotationSpeed: 100, rotation: [10, 10, 10] }); // Speed up rotation and rotate wildly
      await next({ morph: [1, 32, 32] }); // Morph into a perfect sphere
      await next({
        morph: selectedIdGeometry[selectedId],
        rotationSpeed: targetRotationSpeed[selectedId],
        rotation: targetRotation[selectedId],
      }); // Transition to new shape
    },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useEffect(() => {
    setWasClicked(true);
    if (selectedId === 0) {
      setAmplitude(0.7);
      setFrequency(0);
      setDisplacementEffect(0);
      setRotation([0.05, 0.05, 0.05]);
      setStateSphereGeometry([1, 3, 3]);
    } else if (selectedId == 1) {
      setAmplitude(2.5);
      setFrequency(0.1);
      setDisplacementEffect(0.2);
      setRotation([-0.15, 0.15, 0.1]);
      setStateSphereGeometry([1.5, 7, 6]);
    } else if (selectedId === 2) {
      setAmplitude(0.375);
      setFrequency(0.2);
      setDisplacementEffect(0.025);
      setStateSphereGeometry([1.5, 4, 4]);
    } else if (selectedId === 3) {
      setAmplitude(0.1875);
      setFrequency(0.1);
      setDisplacementEffect(0.0125);
    } else {
      setAmplitude(1.5);
      setFrequency(0.8);
      setDisplacementEffect(0.1);
    }
  }, [selectedId]);

  useEffect(() => {
    if (wasClicked === true) {
      setRotation([0, 100, 100]);

      setTimeout(() => {
        setWasClicked(false);
      }, 1000);
    }
  }, [wasClicked]);

  // code for the actual blob
  const meshRef = useRef();
  const simplex = createNoise3D();
  const originalPositions = useRef();

  // const geometry = useMemo(() => {
  //   return selectedId === 1
  //     ? new THREE.SphereGeometry(1.5, 4, 4)
  //     : new THREE.SphereGeometry(
  //          stateSphereGeometry[0],
  //         stateSphereGeometry[1],
  //         stateSphereGeometry[2]
  //       );
  // }, [selectedId]);

  const geometry = new THREE.SphereGeometry(
    stateSphereGeometry[0],
    stateSphereGeometry[1],
    stateSphereGeometry[2]
  );

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
    meshRef.current.rotation.y = time * rotation[0];
    meshRef.current.rotation.x = time * rotation[1];
    meshRef.current.rotation.z = time * rotation[2];

    const positions = meshRef.current.geometry.attributes.position;
    let pX, pY, pZ, noise;
    let displacementArray = [];

    // // Conterols
    // const noiseScale = 0.8 * ((4 - selectedId) / 2); // frequency
    // const noiseAmplitude = 1.5 * ((4 - selectedId) / 2); // amplitude
    // const displacementScale = 0.1 * ((4 - selectedId) / 2); // displacement effect

    const noiseScale = frequency;
    const noiseAmplitude = amplitude;
    const displacementScale = displacementEffect;

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
    <animated.mesh
      ref={meshRef}
      geometry={geometry}
      rotation-x={rotation[0]}
      rotation-y={rotation[1]}
      rotation-z={rotation[2]}
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.2}
        metalness={0.25}
        normalMap={normalMap}
        displacementMap={displacementMap}
      />
    </animated.mesh>
  );
}

export default function Scene({ selectedId }: number) {
  return (
    <Canvas
      className={styles.blobCanvas}
      // style={{ width: "30vh", height: "30vh" }}
      style={{ aspectRatio: "1/1", maxHeight: "50vh", maxWidth: "50vh" }}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
      <pointLight position={[1, 1, 2]} castShadow intensity={3} />
      <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />

      <Blob selectedId={selectedId} />
    </Canvas>
  );
}
