import Image from "next/image";
import styles from "@/app/shows/page.module.css";

export default function ShowPoster({ imagePath }) {
  return (
    <Image
      src={imagePath}
      alt="Show Poster"
      width={144}
      height={216}
      className={styles.poster}
    ></Image>
  );
}
