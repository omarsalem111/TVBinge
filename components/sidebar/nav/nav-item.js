"use client";

import { Suspense } from "react";
import NavLink from "./nav-link";

export default function NavItem({ Icon, path, label }) {
  return (
    <Suspense>
      <NavLink Icon={Icon} path={path} label={label}></NavLink>
    </Suspense>
  );
}
