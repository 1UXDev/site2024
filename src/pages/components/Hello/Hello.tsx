import DevProcess from "./DevProcess";
import styles from "./Hello.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    if (activeSection === "About") {
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
      id="About"
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
        </div>
        <div
          style={{
            position: "absolute",

            bottom: "3rem",

            display: "flex",
            flexFlow: "row wrap",
            gap: "1.25rem",
            margin: "auto",
            alignItems: "center",

            background: "rgba(255,255,255,0.75)",
            padding: "0.5rem 2.5rem 0.5rem 0.6rem",
            borderRadius: "70px",
            width: "fit-content",

            opacity: animationValues.opacityValue,
            transform: `translateY(${animationValues.translateY}%)`,
            transition: "transform 0.75s 1s, opacity 1.25s 1s ease-in-out",
          }}
        >
          <Image
            src="/portraits/julien_small.png"
            width={100}
            height={100}
            className={styles.portrait}
            alt="portrait of Julien Leske"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              textAlign: "left",
              color: "rgb(50,50,50)",
            }}
          >
            <h3>Julien Leske</h3>
            <p>Consulting | Design | Code</p>
          </div>
        </div>
      </div>
    </section>
  );
}
