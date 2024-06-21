import { useState } from "react";

import styles from "./CaseStudies.module.css";
import Image from "next/image";

export default function CaseStudies({
  sectionsRef,
}: {
  sectionsRef: React.MutableRefObject<any>;
}) {
  const caseStudies = [
    {
      id: 0,
      navline:
        "Interactive Training Platform for Medical Professionals to become certified in MRI Imaging & Diagnosis",
      logo: "/references/circle/logo.svg",
      colors: {
        primary: "#2357AF",
        secondary: "#a5abb1",
        tertiary: "#f5f5f5",
      },
      headline: "CMR Orbit",
      images: [
        {
          src: "/references/circle/index.png",
          alt: "Index Page of CMR Orbit Platform",
        },
        {
          src: "/references/circle/training.png",
          alt: "Training Page of CMR Orbit Platform",
        },
      ],
      description: [
        "The client needed to implement a performant and automated solution to offer certifications to medical professionals. We designed a solution that allowed for a seamless experience for the end-user and a robust backend for the client.",
        "CMR Orbit allows doctors to book case-bundles, track their progress, and receive certifications by answering questionnaires. The client can manage the content, track user progress, generate reports and certificates.",
      ],
      services: [
        {
          text: "CX Compliance & Benchmarking",
          link: "/growth-strategy",
        },
        {
          text: "Discovery Workshops",
          link: "/digital-transformation",
        },
        {
          text: "Prototyping & Testing",
          link: "/product-strategy",
        },
      ],
    },
    {
      id: 1,
      navline: "Experience Strategy",
      headline: "Fishing Tourism for the Scandinavian Market",
      logo: "/references/flodge/logo.svg",
      colors: {
        primary: "#0084ff",
        secondary: "#a5abb1",
      },
      images: [
        {
          src: "/references/circle/index.png",
          alt: "Index Page of CMR Orbit Platform",
        },
        {
          src: "/references/circle/training.png",
          alt: "Training Page of CMR Orbit Platform",
        },
      ],
      description: [
        "The client needed to implement a performant and automated solution to offer certifications to medical professionals. We designed a solution that allowed for a seamless experience for the end-user and a robust backend for the client.",
        "CMR Orbit allows doctors to book case-bundles, track their progress, and receive certifications by answering questionnaires. The client can manage the content, track user progress, generate reports and certificates.",
      ],
      services: [
        {
          text: "CX Compliance & Benchmarking",
          link: "/growth-strategy",
        },
        {
          text: "Discovery Workshops",
          link: "/digital-transformation",
        },
        {
          text: "Prototyping & Testing",
          link: "/product-strategy",
        },
      ],
    },
  ];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section
      className={styles.referenceSection}
      id="Case_Studies"
      ref={(el) => {
        sectionsRef.current[3] = el;
      }}
    >
      <article className={styles.caseStudy}>
        <div className={styles.leftSide}>
          <div className={styles.logoContainer}>
            <Image
              src={caseStudies[0].logo}
              width={100}
              height={100}
              className={styles.logo}
              alt="Logo of the client company"
              style={{
                border: `3px solid ${caseStudies[0].colors.primary}`,
              }}
            />
          </div>
          <div className={styles.textContent}>
            <h2 style={{ color: caseStudies[0].colors.primary }}>
              {caseStudies[0].headline}
            </h2>
            <p>
              {caseStudies[0].description.map((paragraph, index) => (
                <>
                  {paragraph}
                  <br />
                </>
              ))}
            </p>
            <ul>
              {caseStudies[0].services.map((service, index) => (
                <li
                  key={service.text}
                  className={index === activeImage ? styles.active : ""}
                  onClick={() => setActiveImage(index)}
                >
                  {service.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.galleryContainer}>
            {caseStudies[0].images[activeImage] && (
              <div className={styles.imageContainer}>
                <Image
                  src={caseStudies[0].images[activeImage].src}
                  alt={caseStudies[0].images[activeImage].alt}
                  width={1440}
                  height={1100}
                  layout="responsive"
                  className={styles.coverImage}
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}

// style={{
//   backgroundImage: `linear-gradient(
//     140deg,
//     ${caseStudies[0].colors.primary} 60%,
//     ${caseStudies[0].colors.secondary} 100%
//   )`,
//   // if the color is too light, change the text color to black
//   color:
//     parseInt(caseStudies[0].colors.primary.replace("#", ""), 16) >
//     0xffffff / 1.1
//       ? "black"
//       : "white",
// }}
