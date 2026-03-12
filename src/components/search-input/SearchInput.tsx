import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.icon} src="/icons/search.svg" alt="" aria-hidden="true" />
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
