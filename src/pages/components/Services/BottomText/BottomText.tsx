import styles from "../ServicesCards/ServicesCards.module.css";

export default function BottomText({ services, selectedService, animateIn }) {
  return (
    <div className={styles.articleTextContainer}>
      <article
        className={`${styles.serviceContent} ${
          animateIn ? styles.animateIn : ""
        }`}
      >
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
  );
}
