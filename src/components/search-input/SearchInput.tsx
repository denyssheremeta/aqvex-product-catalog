import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className="srOnly" htmlFor="catalog-search">
        Поиск товаров
      </label>
      <img className={styles.icon} src="/icons/search.svg" alt="" aria-hidden="true" />
      <input
        id="catalog-search"
        className={styles.input}
        type="search"
        placeholder="Поиск"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
