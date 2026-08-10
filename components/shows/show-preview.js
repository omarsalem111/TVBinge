import episodeImage from "@/assets/episode-image.jpg";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { Ellipsis, Eye } from "lucide-react";

export default function ShowPreview() {
  return (
    <div className={styles.showPreview}>
      <div className={styles.imageContainer}>
        <Image src={episodeImage} alt="Episode Preview" fill></Image>
      </div>
      <div className={styles.showData}>
        <div className={styles.showDetails}>
          <h5>Ted Lasso</h5>
          <p>Season 4: Episode 1 — Home</p>
        </div>
        <div className={styles.showActions}>
          <Ellipsis size={20}></Ellipsis>
          <div className={styles.episodeCount}>
            <Eye size={16}></Eye>
            <p>34 / 44</p>
          </div>
        </div>
      </div>
    </div>
  );
}
