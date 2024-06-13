import React, { useState, useRef, useEffect } from "react";
import styles from "./OuterCircle.module.css";

export function OuterCircle({ phase }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ radius: 0, circumference: 0 });
  const [rotate, setRotate] = useState(1);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const bbox = svgElement.getBBox();
      const radius = bbox.width / 2;
      const circumference = 2 * Math.PI * radius;
      setDimensions({ radius, circumference });
    }
  }, [svgRef]);

  useEffect(() => {
    const baseRotation = 25;
    const exponentialFactor = 2;
    const linearFactor = 0.25;
    const minRotation = 0;
    const maxRotation = 500;

    const rotationValue =
      (baseRotation -
        phase +
        Math.pow(
          phase + 10 / (phase + 1) + exponentialFactor,
          phase + exponentialFactor
        )) /
      ((phase + exponentialFactor) / linearFactor);

    // Clamp the rotation value between minRotation and maxRotation
    setRotate(Math.max(minRotation, Math.min(maxRotation, rotationValue)));

    console.log("--------roate ---------", rotate);
  }, [phase]);

  const offset = dimensions.circumference;
  const diameter = dimensions.radius * 2;
  console.log(dimensions.circumference, dimensions.radius, phase);
  //1581.4    251.69

  //const s4offset = phase === "3" ? offset * 0.8 : 0;
  const s4offset = phase == "3" ? 0 : diameter;

  const s3offset = phase >= "2" ? 0 : diameter * -1;

  const s2offset = phase >= "1" ? 0 : dimensions.radius / 11;
  const s2dash = dimensions.radius / 14;

  const s1offset = phase >= "0" ? 0 : offset;

  return (
    <svg
      id="Hintergrund"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 368.5 368.5"
      style={{
        width: "100%",
        height: "auto",
        rotate: `${rotate}deg`,
        transition: "rotate 1s",
      }}
    >
      <defs>
        <style>
          {`.cls-1{mask:url(#mask);}.cls-2{filter:url(#luminosity-invert);}.cls-3{fill:none;stroke:#1d1d1b;stroke-linecap:round;stroke-linejoin:round;stroke-width:7px;}.cls-4{stroke-width:0px;}`}
        </style>
        <filter
          id="luminosity-invert"
          x="0"
          y="0"
          width="368.5"
          height="368.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feColorMatrix
            result="cm"
            values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"
          />
        </filter>
        <mask
          id="mask"
          x="0"
          y="0"
          width="368.5"
          height="368.5"
          maskUnits="userSpaceOnUse"
        >
          <g className="cls-2">
            <path
              className="cls-3"
              d="M64.12,304.63c-30.85-30.79-49.95-73.35-49.95-120.38,0-77.95,52.46-143.65,124.01-163.76"
              style={{
                strokeDasharray: diameter,
                strokeDashoffset: s4offset,
                transition: "stroke-dashoffset 1s",
              }}
            />
            <path
              className="cls-3"
              d="M354.15,194.91c-.19,2.96-.47,5.92-.83,8.87"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s",
                transitionDelay: "1s",
              }}
            />
            <path
              className="cls-3"
              d="M353.71,168.3c.28,2.94.49,5.89.62,8.84"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s",
                transitionDelay: "0.8s",
              }}
            />
            <path
              className="cls-3"
              d="M349.12,142.23c.73,2.84,1.39,5.71,1.97,8.59"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s",
                transitionDelay: "0.6s",
              }}
            />
            <path
              className="cls-3"
              d="M340.71,117.35c1.14,2.67,2.21,5.38,3.21,8.12"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s",
                transitionDelay: "0.4s",
              }}
            />
            <path
              className="cls-3"
              d="M328.78,94.32c1.51,2.43,2.96,4.91,4.35,7.43"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s",
                transitionDelay: "0.2s",
              }}
            />
            <path
              className="cls-3"
              d="M313.66,73.78c1.85,2.12,3.64,4.3,5.38,6.53"
              style={{
                strokeDasharray: s2dash,
                strokeDashoffset: s2offset,
                transition: "stroke-dashoffset 0.25s ",
              }}
            />
            <path
              className="cls-3"
              d="M77.94,317.01c29.14,23.36,66.11,37.32,106.36,37.32,80.95,0,148.69-56.52,165.9-132.25"
              style={{
                strokeDasharray: diameter,
                strokeDashoffset: s3offset,
                transition: "stroke-dashoffset 1s",
              }}
            />
            <path
              className="cls-3"
              d="M156.29,16.46c9.11-1.51,18.47-2.29,28.01-2.29,45.1,0,86.1,17.54,116.54,46.18"
              style={{
                strokeDasharray: diameter / 2,
                strokeDashoffset: s1offset,
                transition: "stroke-dashoffset 1s",
              }}
            />
          </g>
        </mask>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#c16507", stopOpacity: 1 }} />
          <stop offset="20%" style={{ stopColor: "#dc373c", stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: "#de0075", stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: "#b420b6", stopOpacity: 1 }} />
          <stop offset="80%" style={{ stopColor: "#1253eb", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g className="cls-1">
        <circle
          className="cls-4"
          cx="184.25"
          cy="184.25"
          r="184.25"
          fill="url(#grad1)"
          style={{
            strokeDasharray: dimensions.circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1s",
            transform: "rotate(-30deg)",
            transformOrigin: "center",
          }}
        />
      </g>
    </svg>
  );
}
