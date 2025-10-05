import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, Loader2, Clock, XCircle, X } from 'lucide-react';
import { useLocationSearch } from '../hooks/use-weather';
import { useSearchHistory } from '../hooks/use-search-history';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split('|');
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const showRecentSearches = isOpen && query.length === 0 && history.length > 0;
  const showSuggestions = isOpen && query.length > 2;

  return (
    <div className="relative w-full md:max-w-2xl" ref={commandRef}>
      <Command className="rounded-lg border border-white/30 bg-white/40 text-black/70 transition-all duration-200 hover:bg-white/60">
        <CommandInput
          placeholder="Search any city from worldwide..."
          value={query}
          onValueChange={handleInputChange}
          onFocus={handleInputFocus}
          className="placeholder:text-white"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute top-1.5 right-2 h-6 w-6 p-0 hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        )}

        {(showRecentSearches || showSuggestions) && (
          <CommandList className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-white/30 bg-white/40 !backdrop-blur-2xl">
            {showRecentSearches && (
              <CommandGroup>
                <div className="my-2 flex items-center justify-between px-2">
                  <p className="text-xs">Recent Searches</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                    className="h-auto cursor-pointer p-1 hover:bg-white/60">
                    <XCircle className="h-4 w-4" />
                    <span className="ml-1 text-xs">Clear</span>
                  </Button>
                </div>
                {history.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                    onSelect={handleSelect}
                    className="cursor-pointer">
                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-muted-foreground text-sm">
                        , {item.state}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">
                      , {item.country}
                    </span>
                    <span className="text-muted-foreground ml-auto text-xs">
                      {format(item.searchedAt, 'MMM d, h:mm a')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {showSuggestions && (
              <>
                {!isLoading && locations && locations.length === 0 && (
                  <CommandEmpty className="py-6 text-sm text-black">
                    No cities found.
                  </CommandEmpty>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}

                {locations && locations.length > 0 && (
                  <CommandGroup>
                    {locations.map((location) => (
                      <CommandItem
                        key={`${location.lat}-${location.lon}`}
                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                        onSelect={handleSelect}
                        className="cursor-pointer">
                        <Search className="mr-2 h-4 w-4" />
                        <span>{location.name}</span>
                        {location.state && (
                          <span className="text-muted-foreground text-sm">
                            , {location.state}
                          </span>
                        )}
                        <span className="text-muted-foreground text-sm">
                          , {location.country}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
