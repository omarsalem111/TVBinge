"use client";

import { DropdownMenu } from "radix-ui";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import styles from "./dropdown.module.css";

export default function ProfileDropdown({ action, state }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ChevronDown />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.Content}
          side="top"
          sideOffset={16}
        >
          <DropdownMenu.Item className={styles.Item}>
            <Settings size={14}></Settings>
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={`${styles.Item} ${styles.logout}`}
            onSelect={action}
          >
            <LogOut size={14}></LogOut>
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
