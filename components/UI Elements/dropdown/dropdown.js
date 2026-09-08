import { DropdownMenu } from "radix-ui";
import { EyeClosed, Pause, Square, Check, Play, X } from "lucide-react";
import styles from "./dropdown.module.css";

export default function DropdownElement({ action, state }) {
  const statusIcon = {
    WATCHING: <Play />,
    PAUSED: <Pause />,
    DROPPED: <Square />,
    COMPLETED: <Check />,
  };
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
          {state ? statusIcon[state] : <EyeClosed></EyeClosed>}
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
        {state ? (
          <DropdownMenu.Content
            className={styles.Content}
            side="bottom"
            sideOffset={6}
          >
            <DropdownMenu.Label className={styles.Label}>
              Set To
            </DropdownMenu.Label>
            <DropdownMenu.Group>
              {state !== "PAUSED" && (
                <DropdownMenu.Item
                  className={styles.Item}
                  onSelect={() => action("PAUSED")}
                >
                  <Pause size={16}></Pause>
                  Paused
                </DropdownMenu.Item>
              )}
              {state !== "DROPPED" && (
                <DropdownMenu.Item
                  className={styles.Item}
                  onSelect={() => action("DROPPED")}
                >
                  <Square size={16}></Square>Dropped
                </DropdownMenu.Item>
              )}
              {state !== "COMPLETED" && (
                <DropdownMenu.Item
                  className={styles.Item}
                  onSelect={() => action("COMPLETED")}
                >
                  <Check size={16}></Check> Completed
                </DropdownMenu.Item>
              )}
              {state !== "WATCHING" && (
                <DropdownMenu.Item
                  className={styles.Item}
                  onSelect={() => action("WATCHING")}
                >
                  <Play size={16}></Play>Watching
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Group>
            {state && (
              <>
                <DropdownMenu.Separator className={styles.Separator} />
                <DropdownMenu.Item
                  className={styles.Item}
                  onSelect={() => action()}
                >
                  Add a Review
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={`${styles.Item} ${styles.remove}`}
                  onSelect={() => action()}
                >
                  <X size={16}></X>Remove Show
                </DropdownMenu.Item>
              </>
            )}
          </DropdownMenu.Content>
        ) : (
          <DropdownMenu.Content
            className={styles.Content}
            side="bottom"
            sideOffset={6}
          >
            <DropdownMenu.Item
              className={styles.Item}
              onSelect={() => action("COMPLETED")}
            >
              Mark as Watched
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={styles.Item}
              onSelect={() => action()}
            >
              Add a Review
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        )}
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
