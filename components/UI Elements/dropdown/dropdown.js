import { DropdownMenu } from "radix-ui";
import styles from "./dropdown.module.css";

export default function DropdownElement({
  action,
  activeIcon,
  inactiveIcon,
  state,
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className={
            state ? `${styles.action} ${styles.watched}` : styles.action
          }
        >
          {state ? activeIcon : inactiveIcon}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Content} sideOffset={8}>
          <DropdownMenu.Item className={styles.Item} onSelect={action}>
            Mark as Watched
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item}>
            Add an Review
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
