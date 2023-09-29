import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useAccessibleResultsMenu from "../../hooks/useAccessibleResultsMenu";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductModel } from "../../models";
import { fetchSearchResults, getTitleFromSlug } from "../../utils";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [searchInputExpanded, setSearchInputExpanded] = useState(false);
  const [searchResultsShown, setSearchResultsShown] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeResultIndex, handleKeyDown, setActiveResultIndex } =
    useAccessibleResultsMenu(searchResults, inputRef);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      setSearchResults([]);
    } else {
      fetchSearchResults(debouncedSearchTerm).then((items) =>
        setSearchResults(items),
      );
    }
    setActiveResultIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResultsShown(false);
    }
    if (searchResults.length > 0) {
      setSearchResultsShown(true);
    }
  }, [searchResults]);

  return (
    <div className="w-1/4 h-fit relative flex justify-end items-center ">
      <div
        className={`flex justify-center items-center py-1 border-2 border-slate-500/50 rounded-full transition-all duration-500 cursor-pointer ${
          searchInputExpanded ? "w-full" : "w-9"
        }`}
        onClick={() => {
          setSearchInputExpanded(true);
          inputRef.current?.focus();
        }}
      >
        <BiSearch className="text-slate-500/80 mx-2" />
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => {
            setSearchTerm("");
            setSearchInputExpanded(false);
            setSearchResultsShown(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className={`bg-transparent outline-none transition-all duration-500  ${
            searchInputExpanded ? "w-full" : "w-0"
          }`}
        />
      </div>

      <AnimatePresence>
        {searchResultsShown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="absolute min-w-max w-full h-max z-50 bg-black/30 backdrop-blur-md border-2 border-slate-500/10 rounded-md top-12 p-2"
          >
            <ul>
              {searchResults.map((result, index) => {
                const { slug, img } = result;
                const active = "bg-white/30";

                return (
                  <li
                    key={result.id}
                    onMouseDown={() => router.push(`/${slug}`)}
                    className={`hover:${active} ${
                      index === activeResultIndex ? active : ""
                    } w-fit min-w-fit h-12 m-auto p-4 flex rounded items-center space-x-4 cursor-pointer`}
                  >
                    <div className="relative w-10 h-10">
                      <Image
                        src={img}
                        alt={slug}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>

                    <div className="w-fit">{getTitleFromSlug(slug)}</div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
