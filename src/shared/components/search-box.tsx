import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './search-box.module.css';

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBox = ({
  onQueryChange,
  placeholder = 'Buscar...',
  debounceMs = 250,
}: SearchBoxProps) => {
  const [value, setValue] = useState('');
  const onQueryChangeRef = useRef(onQueryChange);
  useEffect(() => {
    onQueryChangeRef.current = onQueryChange;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQueryChangeRef.current(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        aria-label="Buscar enlaces"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};
