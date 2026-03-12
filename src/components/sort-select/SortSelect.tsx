import styles from "./SortSelect.module.css";
import { SORT_OPTIONS, type SortOption } from "../../constants/sortOptions";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <select className={styles.select} value={value} onChange={(event) => onChange(event.target.value as SortOption)}>
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
