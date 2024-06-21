import React, { useEffect, useState } from "react";
import styles from "./Services.module.css";
import { Scene } from "./Blob";
import Image from "next/image";
import { OuterCircle } from "./OuterCircle/OuterCircle";
import RightSection from "./RightSectionSubNav/RightSection";
import ServicesCards from "./ServicesCards/ServicesCards";
import BottomText from "./BottomText/BottomText";

export default function Services({
  sectionsRef,
}: {
  sectionsRef: React.MutableRefObject<any>;
}) {
  const services = [
    {
      id: 0,
      navline: "Evolve Vision to Experience Strategy",
      headline: "Advance beyond Aesthetics",
      description: [
        "Create experiences that resonate with your audience and drive business outcomes in a compliant & manageable way.",
        "Form innovative CX-Visions and Strategies together with your team to advance from the Status Quo",
      ],
      services: [
        {
          text: "Design for Compliance",
          link: "/cx/compliance",
        },
        {
          text: "CX-Strategy Workshops",
          link: "/cx/strategy-workshops",
        },
        {
          text: "Benchmark todays Experience",
          link: "/cx/benchmark",
        },
      ],
    },
    {
      id: 1,
      navline: "Create super fast Prototypes within a few days",
      headline: "Verify Value with Prototypes",
      description: [
        "Turn Visions into interactive Prototypes in a matter of days. Get validated Feedback immediately with stakeholders and customers.",
        "Leverage rapid development cycles with aligned stakeholders from business, technology and management.",
      ],
      services: [
        {
          text: "Rapid Prototyping",
          link: "/prototyping/",
        },
        {
          text: "UX-Testing",
          link: "prototyping/testing",
        },
        {
          text: "Stakeholder Alignment",
          link: "/prototyping/alignment",
        },
      ],
    },
    {
      id: 2,
      navline: "Drastically reduced go-to-market time",
      headline: "Launch MVPs in a few Weeks",
      description: [
        "Build the right Thing the right way. No matter if you want to build something entirely new or improve existing digital products.",

        "The iterative approach of a Minimum Viable Product (MVP) combines early launches with short improvement cycles.",
      ],
      services: [
        {
          text: "The Minimum Viable Product",
          link: "/mvp/",
        },
        {
          text: "Create new digital Products & Services",
          link: "/mvp/create",
        },
        {
          text: "Evolve existing digital Ecosystems",
          link: "/mvp/evolve",
        },
      ],
    },
    {
      id: 3,
      navline: "Turn Vision into Growth",
      headline: "Scale your digital Products",
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
    <section
      className={styles.servicesSection}
      id="Services"
      ref={(el) => {
        sectionsRef.current[2] = el;
      }}
    >
      <ServicesCards
        selectedService={selectedService}
        services={services}
        setSelectedService={setSelectedService}
      />
      <div className={styles.sceneContainer}>
        <Scene selectedId={selectedService.id} />
        <OuterCircle phase={selectedService.id} />
      </div>
      <BottomText services={services} selectedService={selectedService} />
    </section>
  );
}
