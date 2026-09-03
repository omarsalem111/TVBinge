import profilePic from "@/assets/Personal Pic.png";
import placeholderPic from "@/assets/placeholder-pic.png";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { getUserbyID } from "@/lib/db/user";
import SidebarButton from "./sidebar-button";
import { deleteSession } from "@/lib/validations/session";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getUserbyID();
  async function logOut() {
    "use server";

    await deleteSession();
    redirect("/");
  }
  return (
    <>
      {user.id ? (
        <div className={styles.profile}>
          <Image
            src={profilePic}
            alt="Profile Picture"
            className={styles.profilePic}
            width={40}
            height={40}
          ></Image>
          <SidebarButton auth={user} logOut={logOut}></SidebarButton>
        </div>
      ) : (
        <div className={styles.profile}>
          <SidebarButton auth={user} logOut={logOut}></SidebarButton>
        </div>
      )}
    </>
  );
}
