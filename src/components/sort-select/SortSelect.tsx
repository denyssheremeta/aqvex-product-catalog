import styles from "./SortSelect.module.css";
import { SORT_OPTIONS, type SortOption } from "../../constants/sortOptions";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div className={styles.wrapper}>
      <label className="srOnly" htmlFor="catalog-sort">
        Сортировка товаров
      </label>

      <img src="/icons/arrow-up.svg" alt="" aria-hidden="true" />
      <img src="/icons/arrow-down.svg" alt="" aria-hidden="true" />

      <select
        id="catalog-sort"
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
