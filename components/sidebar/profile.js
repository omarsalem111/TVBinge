import profilePic from "@/assets/Personal Pic.png";
import styles from "./sidebar.module.css";
import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <div className={styles.profile}>
        <Image
          src={profilePic}
          alt="Profile Picture"
          className={styles.profilePic}
          width={48}
          height={48}
        ></Image>
        <div className={styles.profileDetails}>
          <h6>Omar Salem</h6>
          <p>View Details</p>
        </div>
      </div>
    </div>
  );
}
