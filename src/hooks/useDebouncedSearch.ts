import { useState, useEffect, useCallback } from 'react';

export function useDebouncedSearch(delay = 300) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return {
    searchQuery,
    debouncedValue,
    handleSearch
  };
} 