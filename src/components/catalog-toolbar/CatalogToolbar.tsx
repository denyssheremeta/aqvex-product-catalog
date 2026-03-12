import styles from "./CatalogToolbar.module.css";
import { SearchInput } from "../search-input/SearchInput";
import { SortSelect } from "../sort-select/SortSelect";
import type { SortOption } from "../../constants/sortOptions";

interface CatalogToolbarProps {
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const CatalogToolbar = ({
  totalCount,
  searchValue,
  onSearchChange,
  sortBy,
  onSortChange,
}: CatalogToolbarProps) => {
  return (
    <section className={styles.toolbar} aria-label="Инструменты каталога">
      <p className={styles.count}>
        {totalCount} {totalCount > 1 ? "товаров" : "товар"}
      </p>

      <div className={styles.controls}>
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <SortSelect value={sortBy} onChange={onSortChange} />
      </div>
    </section>
  );
};
