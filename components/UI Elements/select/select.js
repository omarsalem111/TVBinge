import { Select } from "radix-ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./select.module.css";

export function SelectElement({ children, onChange, ...props }) {
  return (
    <Select.Root onValueChange={onChange} {...props}>
      <Select.Trigger className={styles.Trigger} aria-label="Seasons">
        <Select.Value />
        <Select.Icon className={styles.Icon}>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          avoidCollisions={false}
          position="popper"
          side={"bottom"}
          sideOffset={5}
          className={styles.Content}
        >
          <Select.ScrollUpButton className={styles.ScrollButton}>
            <ChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.Viewport}>
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.ScrollButton}>
            <ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function SelectItem({ children, className, ...props }) {
  return (
    <Select.Item className={`${styles.Item} ${className}`} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
