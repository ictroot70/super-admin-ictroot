import { useState, useEffect } from "react";

/**
 * Хук для debounce значений.
 * Возвращает "отложенную" версию переданного значения.
 * Обновляется только после паузы в `delay` мс без новых изменений.
 *
 * @param value - Значение для отслеживания (строка, объект, массив и т.д.)
 * @param delay - Задержка в миллисекундах (по умолчанию 500)
 * @returns Debounced значение
 *
 * @example
 * const [search, setSearch] = useState('')
 * const debouncedSearch = useDebounce(search, 400)
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};
