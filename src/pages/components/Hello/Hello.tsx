import DevProcess from "./DevProcess";
import styles from "./Hello.module.css";
import { useEffect, useState } from "react";

import React from "react";

export default function Hello({
  sectionsRef,
  activeSection,
}: {
  sectionsRef: React.MutableRefObject<any>;
  activeSection: string | null;
}) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [animationValues, setAnimationValues] = useState({
    opacityValue: 0,
    translateY: 30,
  });

  useEffect(() => {
    if (activeSection === "hello") {
      (async () => {
        const { Gradient } = await import("whatamesh");
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
      })();

      if (isFirstRender) {
        setTimeout(() => {
          setAnimationValues({
            opacityValue: 1,
            translateY: 0,
          });
          setIsFirstRender(false);
        }, 3000);
      }
    }
  }, [activeSection]);

  return (
    <section
      id="hello"
      ref={(el) => {
        sectionsRef.current[1] = el;
      }}
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(
                        to right bottom,
            #c16507,
            #dc373c,
            #de0075,
            #b420b6,
            #1253eb
          )`,

        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <canvas id="gradient-canvas" className={styles.mesh}></canvas>

      <div className={styles.helloContentContainer}>
        <div className={styles.devProcessContainer}>
          <DevProcess
            activeSection={activeSection}
            isFirstRender={isFirstRender}
            setIsFirstRender={setIsFirstRender}
          />
        </div>

        <div
          style={{
            opacity: animationValues.opacityValue,
            transform: `translateY(${animationValues.translateY}%)`,
            transition: "transform 0.75s, opacity 1.25s ease-in-out",
          }}
        >
          <h2 className={`${styles.helloText}`}>
            I create digital Products <br></br>from Vision to Scale.
          </h2>

          <p>Concept | Design | Prototype | Code</p>
        </div>
      </div>
    </section>
  );
}
