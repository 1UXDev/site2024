import React, { useEffect, useState } from "react";
import styles from "./Services.module.css";
import { Scene } from "./Blob";

export default function Services() {
  const services = [
    {
      id: 0,
      navline: "Experience Strategy",
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
      navline: "Validated MVPs",
      headline: "Validated MVPs",
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
      navline: "Delightful Products",
      headline: "Delightful Products",
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
      navline: "Strategy-Digital-Fit",
      headline: "Strategy-Digital-Fit",
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
      <div className={styles.serviceContentContainer}>
        <div className={styles.subNavContainer}>
          {services.map((service, index) => (
            <h2
              key={index}
              className={
                index === selectedService.id && styles.selectedHeadline
              }
              onClick={() => setSelectedService(service)}
            >
              {service.navline}
            </h2>
          ))}
        </div>

        <div className={styles.sceneContainer}>
          <Scene selectedId={selectedService.id} />
        </div>

        <article className={styles.serviceContent}>
          <h3>{selectedService.headline}</h3>
          {selectedService.description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}

          <ul>
            {selectedService.services.map((service, index) => (
              <li key={index}>
                <a href={service.link}>{service.text}</a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
