import styles from "./header.module.css";

import { getUserbyID } from "@/lib/db/user";
import HeaderButton from "./header-button";
import { deleteSession } from "@/lib/validations/session";
import { redirect } from "next/navigation";

export default async function HomeHeader() {
  const user = await getUserbyID();

  async function logOut() {
    "use server";

    await deleteSession();
    redirect("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <h4>Hello, Omar</h4>
        <p>Explore new stuff and track your comfort shows.</p>
      </div>
      <HeaderButton auth={user} logOut={logOut}></HeaderButton>
    </header>
  );
}
