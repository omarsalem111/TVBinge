import profilePic from "@/assets/Personal Pic.png";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { getUserbyID } from "@/lib/db/user";
import SidebarButton from "./sidebar-button";
import { deleteSession } from "@/lib/validations/session";
import { redirect } from "next/navigation";
import ProfileDropdown from "./dropdown/dropdown";

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
          <div className={styles.userInfo}>
            <Image
              src={profilePic}
              alt="Profile Picture"
              className={styles.profilePic}
              width={24}
              height={24}
            ></Image>
            <p>{user.username}</p>
          </div>
          <ProfileDropdown action={logOut} />
          {/* <SidebarButton auth={user} logOut={logOut}></SidebarButton> */}
        </div>
      ) : (
        <SidebarButton auth={user}></SidebarButton>
      )}
    </>
  );
}
