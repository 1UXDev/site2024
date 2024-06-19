import NavDots from "../NavDots/NavDots";
import styles from "./ServicesCards.module.css";
import { useEffect, useState } from "react";

export default function ServicesCards({
  selectedService,
  services,
  setSelectedService,
}) {
  const [animateIn, setAnimateIn] = useState(false);

  return (
    <div className={styles.servicesCards}>
      <NavDots
        services={services}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />

      <article
        className={`${styles.serviceContent} ${
          animateIn ? styles.animateIn : ""
        }`}
      >
        <span>{selectedService.navline} </span>
        <h2>{selectedService.headline}</h2>
      </article>
    </div>
  );
}
