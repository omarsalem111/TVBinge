import { House, Search, List, Notebook } from "lucide-react";
import NavItem from "./nav-item";

export default function NavList() {
  return (
    <ul>
      <li>
        <NavItem Icon={House} path={"/"} label="Home"></NavItem>
      </li>
      <li>
        <NavItem Icon={Search} path={"/"} label="Discover"></NavItem>
      </li>
      <li>
        <NavItem Icon={List} path={"/"} label="Lists"></NavItem>
      </li>
      <li>
        <NavItem Icon={Notebook} path={"/"} label="Diary"></NavItem>
      </li>
    </ul>
  );
}
