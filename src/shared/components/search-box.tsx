import { ChangeEvent, useEffect, useState } from 'react';

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQueryChange(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs, onQueryChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="search"
      aria-label="Buscar enlaces"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
