import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useSpring, animated } from "@react-spring/three";
import styles from "./Blob.module.css";

function Blob({ selectedId }) {
  const meshRef = useRef();
  // const { viewport } = useThree();
  const simplex = createNoise3D();
  const originalPositions = useRef();

  const [geometry] = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.5, 256, 256);
    originalPositions.current = new Float32Array(geo.attributes.position.array);
    return [geo];
  }, []);

  const {
    amplitude,
    frequency,
    displacement,
    scale,
    initialRotation,
    rotationSpeed,
  } = useSpring({
    amplitude: selectedId === 0 ? 1 : 0.2,
    frequency: selectedId === 0 ? 0.8 : 0.14,
    displacement: selectedId === 0 ? 0.02 : 0.1,
    initialRotation: [
      (selectedId + 1) * 0.5,
      (selectedId + 1) * 0.5,
      (selectedId + 1) * 0.5,
    ],
    rotationSpeed: [0.01, 0.01, 0.01],
    scale: selectedId === 0 ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5],
    config: { mass: 2, tension: 400, friction: 30 },
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position;
    const count = positions.count;

    if (meshRef.current) {
      meshRef.current.rotation.x += (time / 500) * rotationSpeed.get()[0];
      meshRef.current.rotation.y += (time / 400) * rotationSpeed.get()[1];
      meshRef.current.rotation.z += (time / 300) * rotationSpeed.get()[2];
      // meshRef.current.rotation.x += time * rotationSpeed[0];
      // meshRef.current.rotation.y += time * rotationSpeed[1];
      // meshRef.current.rotation.z += time * rotationSpeed[2];
    }

    for (let i = 0; i < count; i++) {
      const x = originalPositions.current[i * 3];
      const y = originalPositions.current[i * 3 + 1];
      const z = originalPositions.current[i * 3 + 2];
      const noise =
        simplex(
          x * frequency.get(),
          y * frequency.get(),
          z * frequency.get() + time
        ) * amplitude.get();
      positions.setXYZ(
        i,
        x + noise * displacement.get(),
        y + noise * displacement.get(),
        z + noise * displacement.get()
      );
    }
    positions.needsUpdate = true;
  });

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

  const [displacementMap, normalMap, aoMap, roughnessMap] = useLoader(
    TextureLoader,
    ["NormalMap.png", "pic.jpg", "NormalMap2.png", "NormalMap.png"]
  );

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      rotation={initialRotation}
      geometry={geometry}
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.2}
        metalness={0.25}
        normalMap={normalMap}
        displacementMap={displacementMap}
        // aoMap={aoMap}
        // roughnessMap={roughnessMap}
      />
    </animated.mesh>
  );
}

export default function Scene({ selectedId }) {
  return (
    <Canvas
      style={{ aspectRatio: "1/1", maxHeight: "50vh", maxWidth: "50vh" }}
      className={styles.blobCanvas}
    >
      <ambientLight intensity={1.25} />
      <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
      <pointLight position={[1, 1, 2]} castShadow intensity={3} />
      <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />
      <Blob selectedId={selectedId} />
    </Canvas>
  );
}

// import React, { useRef, useMemo, useState, useEffect, RefObject } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import * as THREE from "three";
// import { createNoise3D } from "simplex-noise";
// import styles from "./Blob.module.css";
// import { useSpring, animated, SpringValue } from "@react-spring/three";

// function Blob({ selectedId }: { selectedId: number }) {
//   const [stateSphereGeometry] = useState([1, 3, 3]);

//   const [{ amplitude, frequency, displacementEffect, rotation, scale }, set] =
//     useSpring(() => ({
//       amplitude: 1.5,
//       frequency: 0.8,
//       displacementEffect: 0.1,
//       rotation: [1, 0.1, 0.1],
//       scale: [0.3, 0.3, 1],
//       config: { mass: 1, tension: 170, friction: 26, precision: 0.01 },
//     }));

//   useEffect(() => {
//     if (selectedId === 0) {
//       set({
//         amplitude: 0.7,
//         frequency: 0,
//         displacementEffect: 0,
//         scale: [1, 0.1, 0.4],
//         rotation: [0.05, 0.05, 0.05],
//       });
//     } else if (selectedId === 1) {
//       set({
//         amplitude: 2.5,
//         frequency: 1,
//         scale: [1, 1, 1],
//         displacementEffect: 0.2,
//         rotation: [-0.15, 0.15, 0.1],
//       });
//     } else if (selectedId === 2) {
//       set({
//         amplitude: 0.5,
//         frequency: 3,
//         displacementEffect: 0.025,
//         scale: [2, 2, 2],
//         rotation: [0.2, 2, 0.2],
//       });
//     } else if (selectedId === 3) {
//       set({
//         amplitude: 0.1875,
//         frequency: 0.1,
//         displacementEffect: 0.0125,
//         rotation: [0.5, 0.5, 0.5],
//       });
//     } else {
//       set({ amplitude: 1.5, frequency: 0.8, displacementEffect: 0.1 });
//     }
//   }, [selectedId, set]);

//   const meshRef: RefObject<THREE.Mesh> = useRef();

//   const simplex = createNoise3D();
//   const originalPositions = useRef<Float32Array>(new Float32Array());

//   const geometry = useMemo(() => {
//     return new THREE.SphereGeometry(
//       stateSphereGeometry[0],
//       stateSphereGeometry[1],
//       stateSphereGeometry[2]
//     );
//   }, [stateSphereGeometry]);

//   const [displacementMap, normalMap] = useLoader(TextureLoader, [
//     "NormalMap.png",
//     "pic.png",
//   ]);

//   useMemo(() => {
//     const colorsArray = [];
//     const colorStops = [
//       { stop: 0, color: new THREE.Color("#c16507") },
//       { stop: 0.25, color: new THREE.Color("#dc373c") },
//       { stop: 0.5, color: new THREE.Color("#de0075") },
//       { stop: 0.75, color: new THREE.Color("#b420b6") },
//       { stop: 1, color: new THREE.Color("#1253eb") },
//     ];

//     if (geometry && geometry.boundingBox) {
//       const minZ = geometry.boundingBox.min.z;
//       const maxZ = geometry.boundingBox.max.z;
//       const rangeZ = maxZ - minZ;

//       const positionAttribute = geometry.getAttribute("position");
//       for (let i = 0; i < positionAttribute.count; i++) {
//         const z = positionAttribute.getZ(i);
//         const t = (z - minZ) / rangeZ; // Normalized [0, 1] along Z

//         let startIndex = 0;
//         let endIndex = colorStops.length - 1;
//         for (let j = 0; j < colorStops.length - 1; j++) {
//           if (t >= colorStops[j].stop && t <= colorStops[j + 1].stop) {
//             startIndex = j;
//             endIndex = j + 1;
//             break;
//           }
//         }

//         const localT =
//           (t - colorStops[startIndex].stop) /
//           (colorStops[endIndex].stop - colorStops[startIndex].stop);

//         const color = colorStops[startIndex].color
//           .clone()
//           .lerp(colorStops[endIndex].color, localT);

//         colorsArray.push(color.r, color.g, color.b);
//       }

//       geometry.setAttribute(
//         "color",
//         new THREE.Float32BufferAttribute(colorsArray, 3)
//       );
//     }
//   }, [geometry]);

//   useMemo(() => {
//     originalPositions.current = new Float32Array(
//       geometry.attributes.position.array
//     );
//   }, [geometry]);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     if (
//       meshRef.current &&
//       meshRef.current.geometry &&
//       meshRef.current.geometry.attributes.position
//     ) {
//       const positions = meshRef.current.geometry.attributes.position;
//       let pX, pY, pZ, noise;
//       let displacementArray = [];

//       const noiseScale = frequency.get();
//       const noiseAmplitude = amplitude.get();
//       const displacementScale = displacementEffect.get();

//       if (positions.count > 0 && originalPositions.current) {
//         for (let i = 0; i < positions.count; i++) {
//           pX = originalPositions.current[i * 3];
//           pY = originalPositions.current[i * 3 + 1];
//           pZ = originalPositions.current[i * 3 + 2];

//           noise =
//             simplex(
//               pX * noiseScale,
//               pY * noiseScale,
//               pZ * noiseScale + time * 0.35
//             ) * noiseAmplitude;

//           const displacement =
//             Math.sin(noise * 1.5 + time * 0.2) * displacementScale;
//           displacementArray.push(displacement);
//         }

//         for (let i = 0; i < positions.count; i++) {
//           const displacement = displacementArray[i];
//           pX = originalPositions.current[i * 3];
//           pY = originalPositions.current[i * 3 + 1];
//           pZ = originalPositions.current[i * 3 + 2];

//           let v = new THREE.Vector3(pX, pY, pZ).normalize();
//           v.multiplyScalar(displacement);

//           positions.setXYZ(i, pX + v.x, pY + v.y, pZ + v.z);
//         }

//         positions.needsUpdate = true;
//       }
//     }
//   });

//   return (
//     <animated.mesh
//       ref={meshRef}
//       scale={scale}
//       rotation={rotation}
//       displacement={displacementEffect}
//       amplitude={amplitude}
//       frequency={frequency}
//     >
//       <sphereGeometry
//         args={[
//           stateSphereGeometry[0],
//           stateSphereGeometry[1],
//           stateSphereGeometry[2],
//         ]}
//       />
//       <meshStandardMaterial
//         vertexColors
//         roughness={0.2}
//         metalness={0.25}
//         normalMap={normalMap}
//         displacementMap={displacementMap}
//       ></meshStandardMaterial>
//     </animated.mesh>
//   );
// }

// export default function Scene({ selectedId }: { selectedId: number }) {
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

// import React, { useRef, useEffect } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import * as THREE from "three";
// import { useSpring, animated } from "@react-spring/three";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import styles from "./Blob.module.css";

// export function Blob({ selectedId }) {
//   const meshRef = useRef();

//   const { scale, rotation } = useSpring({
//     from: { scale: 1, rotation: [0, 0, 0] },
//     scale: selectedId === 1 ? 1.5 : 1, // Example conditional scaling
//     rotation: selectedId === 1 ? [Math.PI, 0, 0] : [0, Math.PI, 0],
//     config: { mass: 5, tension: 400, friction: 40 },
//   });

//   const [map, normalMap] = useLoader(TextureLoader, [
//     "NormalMap2.png",
//     "NormalMap.png",
//   ]);

//   useFrame(() => {
//     const t = meshRef.current;
//     if (t) {
//       t.rotation.x = rotation.get()[0];
//       t.rotation.y = rotation.get()[1];
//       t.rotation.z = rotation.get()[2];
//     }
//   });

//   return (
//     <animated.mesh
//       ref={meshRef}
//       scale={scale.to((s) => [s, s, s])}
//       rotation-x={rotation.to((r) => r[0])}
//       rotation-y={rotation.to((r) => r[1])}
//       rotation-z={rotation.to((r) => r[2])}
//     >
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial map={map} normalMap={normalMap} />
//     </animated.mesh>
//   );
// }

// export default function Scene({ selectedId }) {
//   return (
//     <Canvas className={styles.blobCanvas}>
//       <ambientLight intensity={1.25} />
//       <pointLight position={[-10, 10, 10]} intensity={1.5} />
//       <Blob selectedId={selectedId} />
//     </Canvas>
//   );
// }

// // import React, { useRef, useMemo, useState, useEffect } from "react";
// // import { Canvas, useFrame, useLoader } from "@react-three/fiber";

// // import { TextureLoader } from "three/src/loaders/TextureLoader";
// // import * as THREE from "three";
// // import { createNoise3D } from "simplex-noise";

// // import styles from "./Blob.module.css";

// // function Blob({ selectedId }: { selectedId: number }) {
// //   // States for the amplitude, frequency, and displacement effect
// //   const [amplitude, setAmplitude] = useState(1.5);
// //   const [frequency, setFrequency] = useState(0.8);
// //   const [displacementEffect, setDisplacementEffect] = useState(0.1);
// //   const [rotation, setRotation] = useState([0.1, 0.1, 0.1]);
// //   const [stateSphereGeometry, setStateSphereGeometry] = useState([1, 3, 3]);

// //   useEffect(() => {
// //     console.log(selectedId);
// //     if (selectedId === 0) {
// //       setAmplitude(0.7);
// //       setFrequency(0);
// //       setDisplacementEffect(0);
// //       setRotation([0.05, 0.05, 0.05]);
// //     } else if (selectedId == 1) {
// //       setAmplitude(2.5);
// //       setFrequency(0.1);
// //       setDisplacementEffect(0.2);
// //       setRotation([-0.15, 0.15, 0.1]);
// //       setStateSphereGeometry([1.5, 7, 6]);
// //     } else if (selectedId === 2) {
// //       setAmplitude(0.375);
// //       setFrequency(0.2);
// //       setDisplacementEffect(0.025);
// //       setStateSphereGeometry([1.5, 4, 4]);
// //     } else if (selectedId === 3) {
// //       setAmplitude(0.1875);
// //       setFrequency(0.1);
// //       setDisplacementEffect(0.0125);
// //     } else {
// //       setAmplitude(1.5);
// //       setFrequency(0.8);
// //       setDisplacementEffect(0.1);
// //     }
// //   }, [selectedId]);

// //   // code for the actual blob
// //   const meshRef = useRef();
// //   const simplex = createNoise3D();
// //   const originalPositions = useRef();

// //   // const geometry = useMemo(() => {
// //   //   return selectedId === 1
// //   //     ? new THREE.SphereGeometry(1.5, 4, 4)
// //   //     : new THREE.SphereGeometry(
// //   //          stateSphereGeometry[0],
// //   //         stateSphereGeometry[1],
// //   //         stateSphereGeometry[2]
// //   //       );
// //   // }, [selectedId]);

// //   const geometry = new THREE.SphereGeometry(
// //     stateSphereGeometry[0],
// //     stateSphereGeometry[1],
// //     stateSphereGeometry[2]
// //   );

// //   // const gradientTexture = textureLoader.load("/pic.jpg");
// //   const [displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
// //     TextureLoader,
// //     ["NormalMap.png", "pic.png", "NormalMap.png", "NormalMap2.png"]
// //   );

// //   useMemo(() => {
// //     const colorsArray = [];
// //     const colorStops = [
// //       { stop: 0, color: new THREE.Color("#c16507") },
// //       { stop: 0.25, color: new THREE.Color("#dc373c") },
// //       { stop: 0.5, color: new THREE.Color("#de0075") },
// //       { stop: 0.75, color: new THREE.Color("#b420b6") },
// //       { stop: 1, color: new THREE.Color("#1253eb") },
// //     ];

// //     geometry.computeBoundingBox();
// //     const minZ = geometry.boundingBox.min.z;
// //     const maxZ = geometry.boundingBox.max.z;
// //     const rangeZ = maxZ - minZ;

// //     const positionAttribute = geometry.getAttribute("position");
// //     for (let i = 0; i < positionAttribute.count; i++) {
// //       const z = positionAttribute.getZ(i);
// //       const t = (z - minZ) / rangeZ; // Normalized [0, 1] along Z

// //       // Find the two color stops t falls between
// //       let startIndex = 0;
// //       let endIndex = colorStops.length - 1;
// //       for (let j = 0; j < colorStops.length - 1; j++) {
// //         if (t >= colorStops[j].stop && t <= colorStops[j + 1].stop) {
// //           startIndex = j;
// //           endIndex = j + 1;
// //           break;
// //         }
// //       }

// //       // Calculate local normalized value (0-1) between these two stops
// //       const localT =
// //         (t - colorStops[startIndex].stop) /
// //         (colorStops[endIndex].stop - colorStops[startIndex].stop);

// //       // Interpolate the color
// //       const color = colorStops[startIndex].color
// //         .clone()
// //         .lerp(colorStops[endIndex].color, localT);

// //       colorsArray.push(color.r, color.g, color.b);
// //     }

// //     geometry.setAttribute(
// //       "color",
// //       new THREE.Float32BufferAttribute(colorsArray, 3)
// //     );
// //   }, [geometry]);

// //   useMemo(() => {
// //     originalPositions.current = Float32Array.from(
// //       geometry.attributes.position.array
// //     );
// //   }, [geometry]);

// //   useFrame((state) => {
// //     const time = state.clock.getElapsedTime();
// //     meshRef.current.rotation.y = time * rotation[0];
// //     meshRef.current.rotation.x = time * rotation[1];
// //     meshRef.current.rotation.z = time * rotation[2];

// //     const positions = meshRef.current.geometry.attributes.position;
// //     let pX, pY, pZ, noise;
// //     let displacementArray = [];

// //     // // Conterols
// //     // const noiseScale = 0.8 * ((4 - selectedId) / 2); // frequency
// //     // const noiseAmplitude = 1.5 * ((4 - selectedId) / 2); // amplitude
// //     // const displacementScale = 0.1 * ((4 - selectedId) / 2); // displacement effect

// //     const noiseScale = frequency;
// //     const noiseAmplitude = amplitude;
// //     const displacementScale = displacementEffect;

// //     for (let i = 0; i < positions.count; i++) {
// //       pX = originalPositions.current[i * 3];
// //       pY = originalPositions.current[i * 3 + 1];
// //       pZ = originalPositions.current[i * 3 + 2];

// //       // Increase frequency by scaling
// //       noise =
// //         simplex(
// //           pX * noiseScale,
// //           pY * noiseScale,
// //           pZ * noiseScale + time * 0.35
// //         ) * noiseAmplitude;

// //       const displacement =
// //         Math.sin(noise * 1.5 + time * 0.2) * displacementScale;
// //       displacementArray.push(displacement);
// //     }

// //     // adjusted displacement

// //     for (let i = 0; i < positions.count; i++) {
// //       const displacement = displacementArray[i];
// //       pX = originalPositions.current[i * 3];
// //       pY = originalPositions.current[i * 3 + 1];
// //       pZ = originalPositions.current[i * 3 + 2];

// //       let v = new THREE.Vector3(pX, pY, pZ).normalize();
// //       v.multiplyScalar(displacement);

// //       positions.setXYZ(i, pX + v.x, pY + v.y, pZ + v.z);
// //     }

// //     positions.needsUpdate = true;
// //   });

// //   return (
// //     <mesh ref={meshRef} geometry={geometry}>
// //       <meshStandardMaterial
// //         vertexColors
// //         roughness={0.2}
// //         metalness={0.25}
// //         normalMap={normalMap}
// //         displacementMap={displacementMap}
// //       ></meshStandardMaterial>
// //     </mesh>
// //   );
// // }

// // export default function Scene({ selectedId }: number) {
// //   return (
// //     <Canvas
// //       className={styles.blobCanvas}
// //       // style={{ width: "30vh", height: "30vh" }}
// //       style={{ aspectRatio: "1/1", maxHeight: "50vh", maxWidth: "50vh" }}
// //     >
// //       <ambientLight intensity={1.25} />
// //       <pointLight position={[-3, 1, 2]} castShadow intensity={1.5} />
// //       <pointLight position={[1, 1, 2]} castShadow intensity={3} />
// //       <pointLight position={[0, 1, 2.5]} castShadow intensity={2} />

// //       <Blob selectedId={selectedId} />
// //     </Canvas>
// //   );
// // }

// import React, { useRef, useMemo, useState, useEffect } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";

// import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial";

// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import * as THREE from "three";
// import { createNoise3D } from "simplex-noise";

// import styles from "./Blob.module.css";
// import { useSpring, animated } from "@react-spring/three";

// export function Blob({ selectedId }: { selectedId: number }) {
//   // States for the amplitude, frequency, and displacement effect
//   const [amplitude, setAmplitude] = useState(1.5);
//   const [frequency, setFrequency] = useState(0.8);
//   const [displacementEffect, setDisplacementEffect] = useState(0.1);
//   const [rotation, setRotation] = useState([0.1, 0.1, 0.1]);
//   const [stateSphereGeometry, setStateSphereGeometry] = useState([1, 3, 3]);

//   const { springScale, springRotation } = useSpring({
//     from: { springScale: 1, springRotation: [0, 0, 0] },
//     springScale: selectedId === 1 ? 1.5 : 1, // Example conditional scaling
//     springRotation: selectedId === 1 ? [Math.PI, 0, 0] : [0, Math.PI, 0],
//     config: { mass: 5, tension: 400, friction: 40 },
//   });

//   const animatedSpringStandardMaterial = animated(THREE.MeshStandardMaterial);

//   useEffect(() => {
//     if (selectedId === 0) {
//       setAmplitude(0.7);
//       setFrequency(0);
//       setDisplacementEffect(0);
//       setRotation([0.05, 0.05, 0.05]);
//     } else if (selectedId == 1) {
//       setAmplitude(2.5);
//       setFrequency(0.1);
//       setDisplacementEffect(0.2);
//       setRotation([-0.15, 0.15, 0.1]);
//       setStateSphereGeometry([1.5, 7, 6]);
//     } else if (selectedId === 2) {
//       setAmplitude(0.375);
//       setFrequency(0.2);
//       setDisplacementEffect(0.025);
//       setStateSphereGeometry([1.5, 4, 4]);
//     } else if (selectedId === 3) {
//       setAmplitude(0.1875);
//       setFrequency(0.1);
//       setDisplacementEffect(0.0225);
//       setStateSphereGeometry([1.5, 256, 256]);
//     } else {
//       setAmplitude(1.5);
//       setFrequency(0.8);
//       setDisplacementEffect(0.1);
//     }
//   }, [selectedId]);

//   // code for the actual blob
//   const meshRef = useRef();
//   const simplex = createNoise3D();
//   const originalPositions = useRef();

//   const geometry = new THREE.SphereGeometry(
//     stateSphereGeometry[0],
//     stateSphereGeometry[1],
//     stateSphereGeometry[2]
//   );

//   // const gradientTexture = textureLoader.load("/pic.jpg");
//   const [displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
//     TextureLoader,
//     ["NormalMap.png", "pic.png", "NormalMap.png", "NormalMap2.png"]
//   );

//   useMemo(() => {
//     const colorsArray = [];
//     const colorStops = [
//       { stop: 0, color: new THREE.Color("#c16507") },
//       { stop: 0.25, color: new THREE.Color("#dc373c") },
//       { stop: 0.5, color: new THREE.Color("#de0075") },
//       { stop: 0.75, color: new THREE.Color("#b420b6") },
//       { stop: 1, color: new THREE.Color("#1253eb") },
//     ];

//     geometry.computeBoundingBox();
//     const minZ = geometry.boundingBox.min.z;
//     const maxZ = geometry.boundingBox.max.z;
//     const rangeZ = maxZ - minZ;

//     const positionAttribute = geometry.getAttribute("position");
//     for (let i = 0; i < positionAttribute.count; i++) {
//       const z = positionAttribute.getZ(i);
//       const t = (z - minZ) / rangeZ; // Normalized [0, 1] along Z

//       // Find the two color stops t falls between
//       let startIndex = 0;
//       let endIndex = colorStops.length - 1;
//       for (let j = 0; j < colorStops.length - 1; j++) {
//         if (t >= colorStops[j].stop && t <= colorStops[j + 1].stop) {
//           startIndex = j;
//           endIndex = j + 1;
//           break;
//         }
//       }

//       // Calculate local normalized value (0-1) between these two stops
//       const localT =
//         (t - colorStops[startIndex].stop) /
//         (colorStops[endIndex].stop - colorStops[startIndex].stop);

//       // Interpolate the color
//       const color = colorStops[startIndex].color
//         .clone()
//         .lerp(colorStops[endIndex].color, localT);

//       colorsArray.push(color.r, color.g, color.b);
//     }

//     geometry.setAttribute(
//       "color",
//       new THREE.Float32BufferAttribute(colorsArray, 3)
//     );
//   }, [geometry]);

//   useMemo(() => {
//     originalPositions.current = Float32Array.from(
//       geometry.attributes.position.array
//     );
//   }, [geometry]);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     meshRef.current.rotation.y = time * rotation[0];
//     meshRef.current.rotation.x = time * rotation[1];
//     meshRef.current.rotation.z = time * rotation[2];

//     const positions = meshRef.current.geometry.attributes.position;
//     let pX, pY, pZ, noise;
//     let displacementArray = [];

//     // // Conterols
//     // const noiseScale = 0.8 * ((4 - selectedId) / 2); // frequency
//     // const noiseAmplitude = 1.5 * ((4 - selectedId) / 2); // amplitude
//     // const displacementScale = 0.1 * ((4 - selectedId) / 2); // displacement effect

//     const noiseScale = frequency;
//     const noiseAmplitude = amplitude;
//     const displacementScale = displacementEffect;

//     for (let i = 0; i < positions.count; i++) {
//       pX = originalPositions.current[i * 3];
//       pY = originalPositions.current[i * 3 + 1];
//       pZ = originalPositions.current[i * 3 + 2];

//       // Increase frequency by scaling
//       noise =
//         simplex(
//           pX * noiseScale,
//           pY * noiseScale,
//           pZ * noiseScale + time * 0.35
//         ) * noiseAmplitude;

//       const displacement =
//         Math.sin(noise * 1.5 + time * 0.2) * displacementScale;
//       displacementArray.push(displacement);
//     }

//     // adjusted displacement

//     for (let i = 0; i < positions.count; i++) {
//       const displacement = displacementArray[i];
//       pX = originalPositions.current[i * 3];
//       pY = originalPositions.current[i * 3 + 1];
//       pZ = originalPositions.current[i * 3 + 2];

//       let v = new THREE.Vector3(pX, pY, pZ).normalize();
//       v.multiplyScalar(displacement);

//       positions.setXYZ(i, pX + v.x, pY + v.y, pZ + v.z);
//     }

//     positions.needsUpdate = true;
//   });

//   return (
//     <mesh ref={meshRef} geometry={geometry}>
//       <animatedSpringStandardMaterial
//         vertexColors
//         roughness={0.2}
//         metalness={0.25}
//         normalMap={normalMap}
//         displacementMap={displacementMap}
//       ></animatedSpringStandardMaterial>
//     </mesh>
//   );
// }

// export default function Scene({ selectedId }: number) {
//   return (
//     <Canvas
//       className={styles.blobCanvas}
//       // style={{ width: "30vh", height: "30vh" }}
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
