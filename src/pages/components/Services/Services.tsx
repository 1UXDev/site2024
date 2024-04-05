import styles from "./Services.module.css";

import Scene from "./Blob";

export default function Services() {
  const selectedService = {
    headline: "Digital Strategy",
    description: [
      "We connect the dots between your business goals, the needs of your customers, and the latest technology to create a digital strategy that will help you grow your business.",

      "We start by understanding your business goals and the needs of your customers. We then use this information to create a digital strategy that will help you achieve your goals and meet the needs of your customers.",

      "Our team of experts will work with you to create a digital strategy that is tailored to your business and your customers. We will help you identify the right digital channels to reach your target audience, and develop a plan to engage with them in a meaningful way.",

      "We will help you measure the success of your digital strategy, and make adjustments as needed to ensure that you are getting the results you want. Our goal is to help you grow your business and achieve your goals through digital marketing.",
    ],
    buttonText: "Check Strategy Readiness",
    buttonAction: () => {
      console.log("Learn More");
    },
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        <h3>Digital Strategy</h3>
        <h3> Prototypes</h3>
        <h3>Successfull Products</h3>
        <h3>Digital Experiences</h3>
      </div>
      <div className={styles.serviceContentContainer}>
        <div className={styles.sceneContainer}>
          <Scene />
        </div>
        <article className={styles.serviceContent}>
          <span>CREATE</span>
          <h2>{selectedService.headline}</h2>
          {selectedService.description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
          <button
            className={styles.learnMoreButton}
            onClick={selectedService.buttonAction}
          >
            <span>{selectedService.buttonText}</span>
          </button>
        </article>
      </div>
    </section>
  );
}
