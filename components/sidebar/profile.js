import profilePic from "@/assets/Personal Pic.png";
import placeholderPic from "@/assets/placeholder-pic.png";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { getUserbyID } from "@/lib/db/user";

export default async function Profile() {
  const user = await getUserbyID();
  return (
    <div>
      {user ? (
        <div className={styles.profile}>
          <Image
            src={profilePic}
            alt="Profile Picture"
            className={styles.profilePic}
            width={48}
            height={48}
          ></Image>
          <div className={styles.profileDetails}>
            <h6>{user.username}</h6>
            <p>View Details</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
