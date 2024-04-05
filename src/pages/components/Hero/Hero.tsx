import React, { useEffect } from "react";
import styles from "./Hero.module.css";
import Typewriter from "typewriter-effect";
import { useSpring, useScroll, animated } from "@react-spring/web";

export default function Hero() {
  // https://codesandbox.io/p/sandbox/scrolling-wave-b07dmz?file=%2Fsrc%2FApp.tsx%3A70%2C23-70%2C73
  // const { scrollYProgress } = useScroll();

  // const animatedStyles = useSpring({
  //   width: scrollYProgress.to((val) => `${val * 100}vw`),
  //   height: scrollYProgress.to((val) => `${val * 100}vw`),
  // });

  // const heroAnimation = useSpring({
  //   from: { transform: "rotate(0deg)" },
  //   to: { transform: "rotate(90deg)" },
  //   config: { mass: 1, friction: 50, tension: 170 },
  //   reset: true,
  //   reverse: scrollYProgress.to((val) => val > 0.5),
  // });

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroTitle}>
        <h1>CREATE</h1>

        <div className={styles.heroTitleDecoration}>
          <div className={styles.heroTitleDecorationInner}></div>
        </div>
      </div>
      <div className={styles.typewriterContainer}>
        <span>digital</span>
        <div className={styles.typewriter}>
          <Typewriter
            options={{
              strings: [
                "<font color='#c16507'>strategies.</font>",
                "<font color='#dc373c'>products.</font>",
                "<font color='#de0075'>experiences.</font>",
                "<font color='#b420b6'>brands.</font>",
                "<font color='#1253eb'>processes.</font>",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </section>
  );
}
