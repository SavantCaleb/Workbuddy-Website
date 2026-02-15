import { useEffect, useRef, useCallback, useState } from 'react';

interface PlaceSelection {
  name: string;
  address: string;
  placeId: string;
}

interface Suggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

interface UseGooglePlacesAutocompleteOptions {
  onSelect: (place: PlaceSelection) => void;
}

const API_URL = 'https://places.googleapis.com/v1/places:autocomplete';

export function useGooglePlacesAutocomplete({ onSelect }: UseGooglePlacesAutocompleteOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const justSelectedRef = useRef(false);

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!apiKey || input.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
        },
        body: JSON.stringify({
          input,
          includedPrimaryTypes: ['laundry'],
          includedRegionCodes: ['us'],
        }),
      });

      if (!res.ok) return;

      const data = await res.json();
      const items: Suggestion[] = (data.suggestions || [])
        .filter((s: Record<string, unknown>) => s.placePrediction)
        .map((s: { placePrediction: {
          placeId: string;
          structuredFormat: {
            mainText: { text: string };
            secondaryText: { text: string };
          };
        }}) => ({
          placeId: s.placePrediction.placeId,
          mainText: s.placePrediction.structuredFormat.mainText.text,
          secondaryText: s.placePrediction.structuredFormat.secondaryText.text,
        }));

      setSuggestions(items);
      setShowDropdown(items.length > 0);
    } catch {
      // Silently fail — field works as plain text input
    }
  }, [apiKey]);

  // Debounced input handler
  const handleInput = useCallback(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    const value = inputRef.current?.value || '';
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }, [fetchSuggestions]);

  // Select a suggestion
  const selectSuggestion = useCallback((suggestion: Suggestion) => {
    justSelectedRef.current = true;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (inputRef.current) {
      inputRef.current.value = suggestion.mainText;
      // Dispatch input event so React picks up the change
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, suggestion.mainText);
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }

    onSelectRef.current({
      name: suggestion.mainText,
      address: suggestion.secondaryText,
      placeId: suggestion.placeId,
    });

    setSuggestions([]);
    setShowDropdown(false);
  }, []);

  // Attach input listener
  useEffect(() => {
    const input = inputRef.current;
    if (!input || !apiKey) return;

    input.addEventListener('input', handleInput);
    return () => input.removeEventListener('input', handleInput);
  }, [handleInput, apiKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on blur with delay (so click on suggestion registers)
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleBlur = () => {
      setTimeout(() => setShowDropdown(false), 200);
    };
    const handleFocus = () => {
      if (suggestions.length > 0) setShowDropdown(true);
    };

    input.addEventListener('blur', handleBlur);
    input.addEventListener('focus', handleFocus);
    return () => {
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('focus', handleFocus);
    };
  }, [suggestions.length]);

  // Trap scroll inside dropdown — prevent page scroll (desktop)
  const handleDropdownWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop === 0 && e.deltaY < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

    if (atTop || atBottom) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, []);

  // Trap touch scroll inside dropdown — prevent page scroll (mobile)
  const touchStartY = useRef(0);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown || !showDropdown) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = dropdown;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    dropdown.addEventListener('touchstart', handleTouchStart, { passive: true });
    dropdown.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      dropdown.removeEventListener('touchstart', handleTouchStart);
      dropdown.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showDropdown]);

  return { inputRef, suggestions, showDropdown, dropdownRef, selectSuggestion, handleDropdownWheel };
}
