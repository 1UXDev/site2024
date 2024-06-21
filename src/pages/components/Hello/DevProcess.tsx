import React, { useState, useRef, useEffect } from "react";

export default function DevProcess({
  activeSection,
  isFirstRender,
  setIsFirstRender,
}) {
  const svgRef = useRef(null);
  const [dashOffset, setDashOffset] = useState(0);
  const [dashArray, setDashArray] = useState(0);
  const [displaySVG, setDisplaySVG] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContinuousAnimation, setIsContinuousAnimation] = useState(false);

  useEffect(() => {
    if (activeSection !== "About") {
      return;
    }

    const timer = setTimeout(() => {
      if (svgRef.current) {
        const svgElement = svgRef.current;
        const pathElement = svgElement.querySelector("path");

        setDisplaySVG(true);

        if (pathElement) {
          const pathLength = pathElement.getTotalLength();

          setDashArray(pathLength);
          setDashOffset(-pathLength);

          // Trigger re-render to animate
          setTimeout(() => {
            setIsAnimating(true);
            setDashOffset(0);
            setTimeout(() => {
              setIsAnimating(false);
              setIsContinuousAnimation(true); // Start continuous animation after initial animation
            }, 5000);
          }, 500);
        }
      }
    }, 200);

    if (isFirstRender) {
      setIsFirstRender(false);
    }

    return () => clearTimeout(timer);
  }, [activeSection, isFirstRender]);

  return (
    <svg
      version="1.1"
      id="Ebene_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 400 100"
      ref={svgRef}
      style={{
        opacity: displaySVG ? 1 : 0,
        transition: "opacity 1s 0.5s",
      }}
    >
      <style type="text/css">
        {`.st0 {
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
          @keyframes continuousAnimation {
            0% {
              stroke-dashoffset: 10;
              stroke-dasharray: ${dashArray} 15%;
            }
            40% {
              stroke-dashoffset: ${dashArray * 0.5};
              stroke-dasharray: ${dashArray} 80%;
            }
            100% {
              stroke-dashoffset: ${dashArray * 1};
              stroke-dasharray: ${dashArray} 1%;
            }
          }
        `}
      </style>
      <path
        className="st0"
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          transition: isAnimating ? "stroke-dashoffset 5s ease-in-out" : "none",
          animation: isContinuousAnimation
            ? "continuousAnimation 12s linear infinite"
            : "none",
        }}
        d="M381.2,56.4c-28.3-0.2-53.4,0.2-81.6,0c-1.9,0-5.9-1-6.7-2.7c-1.1-2.3,0.3-4.2,2.8-4.5c0.6-0.1,1.2-0.1,1.6,0.3
    c1.1,0.7,0.5,2.5-0.4,3.4c-2.1,2.3-5.3,3.2-8.3,3.8c-3.1,0.6-6.5,0.9-9.1-0.9c-2.6-1.8-3.3-6.3-0.5-7.8c0.6-0.3,1.4-0.5,2-0.1
    c1.8,0.9,0.3,3.7-1.4,4.8c-4.3,3-9.5,4.7-14.8,4.9c-2.4,0.1-5.1-0.2-6.9-1.9c-2.8-2.8-1-8.6,3-9.2c0.7-0.1,1.4-0.1,2,0.3
    c1.8,1.2,0.2,4-1.6,5.3c-5.4,3.9-12.4,5.8-19,5c-2.1-0.2-4.3-0.8-5.7-2.3c-1.6-1.7-1.8-4.4-1-6.5s2.7-3.8,4.8-4.8
    c1.2-0.6,2.6-0.9,3.7-0.3c1.4,0.7,1.7,2.6,1.2,4.1s-1.8,2.5-3,3.4c-6.3,4.7-14.4,7.1-22.3,6.5c-4.4-0.3-9.8-2.7-9.7-7.2
    c0-2.2,1.4-4.8,3-6.4c1.8-1.8,4.3-2.8,6.9-2.5s4.8,3.2,3.5,5.5c-0.5,1-2.8,2.8-3.8,3.3c-4.1,2-8,2.8-11.6,3.5
    c-3.6,0.7-8.1-0.4-8.5-4.6c-1.3,8.1-2.1,16.4-2.4,24.6c-0.4-15.3-0.2-30.7,0.5-46c-1.6,8.9-3.4,16.7-5.3,25.5
    c-1.8,2.7-7.7,0.8-10.8-2.4c-1.8,9.1-2.7,18.5-2.6,27.8c-0.6-18.4-0.2-36.8,1.3-55.2c-2.3,10.1-4.1,19.2-5,29.6
    c-2.8,3.3-10.4,1.6-11-4.1c-1.7,10.9-2.8,22-3.2,33.1c-0.5-20.6-0.3-41.3,0.7-61.9c-2.2,12-3.8,21.5-6.4,33.4
    c-4.6,2.5-7.2,1.1-10.4-3c-1.9,11.8-2.8,23.9-2.7,35.9c-0.6-23.8-0.2-47.6,1.3-71.2c-2.4,13.1-4,26.7-4.9,40.1
    c-6.3,3.3-12.3,0.2-13-7.4c-2.1,14.3-3.4,28.8-3.9,43.4c-0.7-27-0.4-54.1,0.9-81c-2.6,15.7-5.5,28.2-8.9,42.3
    c-35.7,0-99.3,0-107.3,0"
      />
    </svg>
  );
}
