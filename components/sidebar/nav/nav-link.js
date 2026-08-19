import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav.module.css";

export default function NavLink({ Icon, path, label }) {
  const urlPath = usePathname();
  return (
    <>
      <div
        className={
          urlPath === path
            ? `${styles.navItem} ${styles.active}`
            : `${styles.navItem}`
        }
      >
        <Icon size={24}></Icon>
        <Link href={path}>{label}</Link>
      </div>
    </>
  );
}
