import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 0,
      navline: "Experience Strategy",
      headline: "Advance beyond Aesthetics",
      images: [
        {
          src: "/references/circle/index.png",
          alt: "Index Page of CMR Orbit Platform",
        },
        {
          src: "/references/circle/training.png",
          alt: "Training Page of CMR Orbit Platform",
        },
      ],
      description: [
        "The client needed to implement a performant and automated solution to offer certifications to medical professionals. We designed a solution that allowed for a seamless experience for the end-user and a robust backend for the client.",
        "CMR Orbit allows doctors to book case-bundles, track their progress, and receive certifications by answering questionnaires. The client can manage the content, track user progress, generate reports and certificates.",
      ],
      services: [
        {
          text: "CX Compliance & Benchmarking",
          link: "/growth-strategy",
        },
        {
          text: "Discovery Workshops",
          link: "/digital-transformation",
        },
        {
          text: "Prototyping & Testing",
          link: "/product-strategy",
        },
      ],
    },
  ];

  return (
    <section className={styles.referenceSection}>
      <h1>Case Studies</h1>
      {caseStudies.map((caseStudy) => (
        <article key={caseStudy.id}>
          <div className={styles.leftSide}>
            <h2>{caseStudy.headline}</h2>
            <p>{caseStudy.description[0]}</p>

            <ul>
              {caseStudy.services.map((service) => (
                <li key={service.text}>
                  <a href={service.link}>{service.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.rightSide}>
            {caseStudy.images.map((image, index) => (
              <div className={styles.imageContainer} key={`image` + index}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
