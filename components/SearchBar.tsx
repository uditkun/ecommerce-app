import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRef } from "react";
import useMenuToggle from "../hooks/useMenuToggle";
import useProductSearch from "../hooks/useProductSearch";
import { getHref } from "../utils/helperFunctions";

const SearchBar = () => {
  const {
    queryData: { data },
    setSearchValue,
  } = useProductSearch();

  const router = useRouter();
  let defaultValue = router.query?.searchWord;

  const inputRef = useRef<HTMLInputElement>(null);

  useMenuToggle(inputRef, "searchResults");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let searchWord = inputRef.current!.value;
          //searchword validation
          if (searchWord) {
            router.push({
              pathname: "/search/[searchWord]",
              query: { searchWord },
            });
          }
        }}
        className="w-full sm:w-3/5 flex order-1 sm:order-none relative"
      >
        <input
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-gray-800 p-2 rounded-sm font-semibold w-full max-w-[600px] placeholder:text-slate-400"
          type="text"
          defaultValue={defaultValue ? defaultValue : ""}
          placeholder="Search Product"
        />
        <button
          className="px-6 py-1 bg-gray-600 rounded-tr-sm rounded-br-sm"
          type="submit"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {data && (
          <ul
            id="searchResults"
            className="top-10 left-0 absolute mx-auto w-full bg-white rounded-b"
          >
            {data.map((displayData: any, index: number) => {
              if (index > 4) {
                return;
              }
              return (
                <li
                  key={index}
                  className="text-black py-2 pl-3 cursor-pointer block"
                  onClick={() =>
                    router.push(`/products/${getHref(displayData.name)}`)
                  }
                >
                  {displayData.name}
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </>
  );
};

export default SearchBar;
