import styles from "./RightSection.module.css";

export default function RightSection({
  selectedService,
  setSelectedService,
  services,
}) {
  return (
    <ul className={styles.subNavContainer}>
      {services.map((service, index) => (
        <li
          key={index}
          className={
            index === selectedService.id ? styles.selectedHeadline : ""
          }
          onClick={() => setSelectedService(service)}
        >
          {service.navline}
        </li>
      ))}
    </ul>
  );
}
