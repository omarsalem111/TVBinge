import styles from "./header.module.css";
import { getUserbyID } from "@/lib/db/user";

export default async function HomeHeader() {
  const user = await getUserbyID();

  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <h4>Hello, Omar</h4>
        <p>Explore new stuff and track your comfort shows.</p>
      </div>
    </header>
  );
}
