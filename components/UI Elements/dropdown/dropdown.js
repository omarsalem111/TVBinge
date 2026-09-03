import { DropdownMenu } from "radix-ui";
import { EyeClosed, Pause, Square, Check, Play, X } from "lucide-react";
import styles from "./dropdown.module.css";

export default function DropdownElement({ action, state }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className={
            state
              ? `${styles.action} ${styles[state.toLowerCase()]}`
              : styles.action
          }
        >
          {state ? <Play></Play> : <EyeClosed></EyeClosed>}
          <span
            className={
              state
                ? `${styles.actionLabel} ${styles.active}`
                : styles.actionLabel
            }
          >
            {state ? state : <p>Add to Watched</p>}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.Content}
          side="bottom"
          sideOffset={6}
        >
          <DropdownMenu.Label className={styles.Label}>
            Set To
          </DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.Item className={styles.Item} onSelect={action}>
              <Pause size={16}></Pause>
              Paused
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.Item}>
              <Square size={16}></Square>Dropped
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.Item}>
              <Check size={16}></Check> Completed
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.Item}>
              <Play size={16}></Play>Watching
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.Item}>
              <X size={16}></X>Remove
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
