"use client";

import Image from "next/image";
import styles from "./show-details.module.css";
import { useState } from "react";

export default function CastMember({ imagePath, personName, personRole }) {
  const [imgError, setImgError] = useState(false);

  function viewFallbackImage() {
    setImgError(true);
  }

  return imgError ? (
    <div className={styles.fallbackImg}>
      <p>{personName}</p>
    </div>
  ) : (
    <div className={styles.castMember}>
      <Image
        src={imagePath}
        alt="Person Pic"
        width={96}
        height={144}
        className={styles.poster}
        onError={viewFallbackImage}
      ></Image>
      <div>
        <p className={styles.castName}>{personName}</p>
        <p className={styles.castRole}>{personRole}</p>
      </div>
    </div>
  );
}
