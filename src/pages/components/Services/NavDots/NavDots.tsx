import styles from "./NavDots.module.css";
export default function NavDots({
  services,
  selectedService,
  setSelectedService,
}) {
  return (
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
  );
}
