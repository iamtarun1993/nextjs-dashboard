'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams,  } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(searcItem: string) {
    console.log(searcItem);
    const params = new URLSearchParams();
    params.set('page', '1');

    if (searcItem) {
      params.set('query', searcItem);
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const handleSearchWithDebounce = debounce(handleSearch, 300)

  function debounce<T extends (...args: any[]) => void>(
    fn: T, 
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function(this: any, ...args: Parameters<T>) {
      // Clear the existing timer if the function is called again
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timer
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }


  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        //onChange={(e) => handleSearch(e.target.value)}
        onChange={(e) => handleSearchWithDebounce(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
