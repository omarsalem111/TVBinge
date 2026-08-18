import styles from "./show-details.module.css";
import Image from "next/image";

export default async function ShowHeader({ bannerImg, logo, showName }) {
  return (
    <article className={styles.featured}>
      <Image
        src={bannerImg}
        alt="Backdrop Image"
        className={styles.backdrop}
        fill
      ></Image>
      <div className={styles.overlay}>
        <div className={styles.headerContent}>
          {logo ? (
            <Image
              src={logo}
              alt="Show Logo"
              width={244}
              height={144}
              className={styles.logo}
            ></Image>
          ) : (
            <h2>{showName}</h2>
          )}

          {/* <p>{tagline}</p> */}
        </div>
      </div>
    </article>
  );
}
