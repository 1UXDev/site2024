import React, { useEffect, useState } from "react";
import styles from "./Services.module.css";
import { Scene } from "./Blob";
import Image from "next/image";
import { OuterCircle } from "./OuterCircle/OuterCircle";
import RightSection from "./RightSectionSubNav/RightSection";
import ServicesCards from "./ServicesCards/ServicesCards";

export default function Services() {
  const services = [
    {
      id: 0,
      navline: "Reliable Experience Strategy",
      headline: "Advance beyond Aesthetics",
      description: [
        "Good Design creates experiences that resonate with your audience and drive business outcomes in a compliant & manageable way.",
        "",
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
      navline: "Super fast Prototypes",
      headline: "Create Successful Prototypes in a few Days",
      description: [
        "Bring your ideas to life with our Prototypes & MVPs services. From initial concept to a market-ready product, we specialize in creating prototypes and Minimum Viable Products that allow for iterative testing and rapid learning.",

        "Validate your ideas and accelerate your path to market with our expertly crafted solutions.",
      ],
      services: [
        {
          text: "Rapid Prototyping",
          link: "/growth-strategy",
        },
        {
          text: "MVP Development",
          link: "/digital-transformation",
        },
        {
          text: "Iterative Design and Testing",
          link: "/product-strategy",
        },
      ],
    },
    {
      id: 2,
      navline: "Launch MVPs in the matter of Weeks",
      headline: "Launch MVPs in the matter of Weeks",
      description: [
        "In a world where staying ahead means being disruptive, our Disruptive Products services are designed to help you redefine markets.",

        "By focusing on emerging behaviors, technologies, and needs, we assist in launching products that not only meet the moment but also set new standards.",
      ],
      services: [
        {
          text: "Innovative Product Development",
          link: "/growth-strategy",
        },
        {
          text: "Market Analysis & Emerging Trends",
          link: "/digital-transformation",
        },
        {
          text: "Corporate Venture Building",
          link: "/product-strategy",
        },
      ],
    },
    {
      id: 3,
      navline: "Build  & Scale Delightful Products",
      headline: "Build Delightful Products",
      description: [
        "In an era where technology evolves at the speed of thought, your business needs a Digital Strategy that's not only robust but also flexible enough to adapt to new trends and challenges.",

        "Let us help you navigate the digital landscape with forward-thinking strategies that ensure your business not only survives but thrives.",
      ],
      services: [
        {
          text: "Growth Strategy Development",
          link: "/growth-strategy",
        },
        {
          text: "Innovation Strategy",
          link: "/digital-transformation",
        },
        {
          text: "Digital Transformation Planning",
          link: "/product-strategy",
        },
      ],
    },
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  if (!selectedService) {
    return "loading...";
  }

  return (
    <section className={styles.servicesSection}>
      <ServicesCards selectedService={selectedService} />
      <div className={styles.sceneContainer}>
        <Scene selectedId={selectedService.id} />
        <OuterCircle phase={selectedService.id} />
      </div>
      <div className={styles.rightSectionContainer}>
        <RightSection
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          services={services}
        />
      </div>

      <div className={styles.navDots}>
        {services.map((service, index) => (
          <div
            key={index}
            className={
              index === selectedService.id
                ? `${styles.navDot} ${styles.selectedNavDot}`
                : styles.navDot
            }
            onClick={() => setSelectedService(service)}
          ></div>
        ))}
      </div>
    </section>
  );
}
