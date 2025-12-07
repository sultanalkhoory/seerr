import useSearchInput from '@app/hooks/useSearchInput';
import defineMessages from '@app/utils/defineMessages';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';

const messages = defineMessages('components.Layout.SearchInput', {
  searchPlaceholder: 'Search Movies & TV',
});

const SearchInput = () => {
  const intl = useIntl();
  const { searchValue, setSearchValue, setIsOpen, clear } = useSearchInput();
  return (
    <div className="flex flex-1">
      <div className="flex w-full">
        <label htmlFor="search_field" className="sr-only">
          Search
        </label>
        <div className="relative flex w-full items-center text-text-primary focus-within:text-text-primary">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-text-tertiary" />
          </div>
          <input
            id="search_field"
            style={{ paddingRight: searchValue.length > 0 ? '2.5rem' : '' }}
            className="block w-full rounded-glass-full border border-glass-border bg-glass-200/80 py-2.5 pl-11 text-text-primary placeholder-text-muted backdrop-blur-glass-sm transition-all duration-200 hover:border-glass-border-light hover:bg-glass-300/80 focus:border-apple-blue/50 focus:bg-glass-300 focus:placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-apple-blue/20 sm:text-base"
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            type="search"
            autoComplete="off"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              if (searchValue === '') {
                setIsOpen(false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                (e.target as HTMLInputElement).blur();
              }
            }}
          />
          {searchValue.length > 0 && (
            <button
              className="absolute inset-y-0 right-3 m-auto flex h-7 w-7 items-center justify-center rounded-glass-full border-none p-1 text-text-muted outline-none transition-all duration-200 hover:bg-glass-300 hover:text-text-primary focus:border-none focus:outline-none"
              onClick={() => clear()}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
