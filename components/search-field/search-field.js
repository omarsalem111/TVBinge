import { Search } from "lucide-react";
import Input from "@/components/input/input";
import styles from "./search.module.css";

export default function SearchField() {
  return (
    <form className={styles.searchField}>
      <Search size={20}></Search>
      <Input
        className={styles.input}
        name={"showName"}
        type={"text"}
        placeholder={"Find any TV Show you want. e.g... Breaking Bad."}
      ></Input>
      {/* <button type="submit">Search</button> */}
    </form>
  );
}
