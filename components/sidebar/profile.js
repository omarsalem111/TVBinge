import profilePic from "@/assets/Personal Pic.png";
import placeholderPic from "@/assets/placeholder-pic.png";
import styles from "./sidebar.module.css";
import Image from "next/image";

export default function Profile() {
  return (
    <div>
      {/* <div className={styles.profile}>
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
      </div> */}
      <div className={styles.profile}>
        <Image
          src={placeholderPic}
          alt="Placeholder Pic"
          className={styles.profilePic}
          width={48}
          height={48}
        ></Image>
        <div className={styles.profileDetails}>
          <span>Log In </span>
          <p>or</p>
          <span> Sign Up</span>
        </div>
      </div>
    </div>
  );
}
