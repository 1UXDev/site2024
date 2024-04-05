import styles from "./Services.module.css";

import Scene from "./Blob";

export default function Services() {
  const selectedService = {
    headline: "Digital Strategy",
    description:
      "We help you define your digital strategy by understanding your business goals and objectives. We then create a roadmap to help you achieve them.",
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        <h2>Digital Strategy</h2>
        <h2>Digital Prototypes</h2>
        <h2>Digital Products</h2>
        <h2>Digital Experiences</h2>
      </div>
      <div>
        <div className={styles.sceneContainer}>
          <Scene />
        </div>
        <div className={styles.serviceContent}>
          <span>CREATE</span>
          <h2>{selectedService.headline}</h2>
          <p>{selectedService.description}</p>
        </div>
      </div>
    </section>
  );
}
