import styles from "./ServicesCards.module.css";

export default function ServicesCards({ selectedService }) {
  return (
    <div
      className={styles.articleContainer}
      style={{
        transform: `translateX(${selectedId * -100}%)`,
      }}
    >
      {services.map((service, index) => (
        <article className={styles.serviceContent} key={`service-${index}`}>
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
    </div>
  );
}
