import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav";
import Services from "./components/Services/Services";
import CaseStudies from "./components/CaseStudies/CaseStudies";
import Hello from "./components/Hello/Hello";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <main className={styles.main}>
      <Head>
        <title>Create - Full Stack Product - Julien Leske</title>
        <meta
          name="description"
          content="Create digital Products from Vision to Scale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.scrollSnap}>
        <Hero sectionsRef={sectionsRef} />

        <Hello sectionsRef={sectionsRef} activeSection={activeSection} />

        <Services sectionsRef={sectionsRef} />

        <CaseStudies sectionsRef={sectionsRef} />
      </div>
      <div className={styles.indicator}>Current Section: {activeSection}</div>
    </main>
  );
}
