import { getUserbyID } from "@/lib/db/user";
import ShowActions from "./show-actions";
import styles from "./show-details.module.css";
import Image from "next/image";
import { getShowState } from "@/lib/db/tracking";

export default async function ShowHeader({ bannerImg, logo, showData }) {
  const { id: userId } = await getUserbyID();
  const show = await getShowState(userId, showData.id);
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
            <h2>{showData.name}</h2>
          )}
        </div>
        <ShowActions showStatus={show?.showStatus} />
      </div>
    </article>
  );
}
