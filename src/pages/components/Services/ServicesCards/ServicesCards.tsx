import NavDots from "../NavDots/NavDots";
import styles from "./ServicesCards.module.css";
import { useEffect, useState } from "react";

export default function ServicesCards({
  selectedService,
  services,
  setSelectedService,
}) {
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [localServices, setLocalServices] = useState(services);

  //   useEffect(() => {
  //     setAnimateOut(previousService);

  //     setPreviousService(selectedService.id);

  //     setTimeout(() => {
  //       setAnimateIn(selectedService.id);
  //     }, 500);
  //     setTimeout(() => {
  //       setAnimateIn(false);
  //     }, 1000);
  //   }, [selectedService]);

  return (
    <div className={styles.servicesCards}>
      <NavDots
        services={services}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
      <div className={styles.articleContainer}>
        {services.map((service, index) => (
          <article
            className={`${styles.serviceContent} ${
              selectedService.id === index ? styles.selected : ""
            } ${
              selectedService.id === index && animateIn ? styles.animateIn : ""
            }`}
            key={`service-${service.id}`}
          >
            <span>{service.navline} </span>
            <h3>{service.headline}</h3>
            {service.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}

            <ul>
              {service.services.map((service, index) => (
                <li key={index}>
                  <a href={service.link}>{service.text}</a>
                </li>
              ))}
            </ul>
          </article>
        ))}

        {/* <article
        className={`${styles.serviceContent} ${
          animate ? styles.animateIn : ""
        }`}
        key={`service-${selectedService.id}`}
      >
        <span>{selectedService.navline} </span>
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
      </article> */}
      </div>
    </div>
  );
}
