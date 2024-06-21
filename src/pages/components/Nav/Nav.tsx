import styles from "./Nav.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav({ activeSection }) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    // listen for scroll event
    window.addEventListener("scroll", () => {
      // check if window scroll is greater than 20px
      if (window.scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  return (
    <nav
      className={`${styles.nav} ${
        activeSection !== "hero"
          ? styles.navScrollContainer
          : styles.navContainer
      }`}
    >
      <div className={styles.logo}>
        <Link href="/">CREATE</Link>
      </div>

      <Link href="/" className={styles.navLink}>
        About
      </Link>

      <Link href="/" className={styles.navLink}>
        Services
      </Link>

      <Link href="/" className={styles.navLink}>
        Case Studies
      </Link>

      <Link href="/" className={styles.navLink}>
        Contact
      </Link>
    </nav>
  );
}
