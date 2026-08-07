import styles from "@/app/page.module.css";
import backgroundImage from "@/assets/backdrop-image.jpg";
import Image from "next/image";

export default function FeaturedShow() {
  return (
    <article className={styles.featured}>
      <Image src={backgroundImage} alt="Ted Lasso Backdrop Image" fill></Image>
      <div className={styles.overlay}>
        <h2>Ted Lasso is Back!</h2>
        <p>Season 4 : Episode 1 is out.</p>
      </div>
    </article>
  );
}
