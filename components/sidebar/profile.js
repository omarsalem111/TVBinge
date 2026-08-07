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
          width={50}
          height={50}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        ></Image>
        <div>
          <h6>Omar Salem</h6>
          <p>Click to view</p>
        </div>
      </div>
    </div>
  );
}
