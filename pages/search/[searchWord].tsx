import React, {
  LegacyRef,
  MouseEventHandler,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/router";
import useProductSearch from "../../hooks/useProductSearch";
import ProductsList from "../../components/ProductsList";
import useSearchFilter from "../../hooks/useSearchFilter";

function MainSearchShop() {
  const router = useRouter();

  const {
    queryData: { data, isFetched, isError },
    setSearchValue,
  } = useProductSearch();

  useEffect(() => {
    setSearchValue(String(router.query.searchWord));
  }, [router.query.searchWord, setSearchValue]);

  const {
    onChangeDiscountFilter,
    onChangePriceRange,
    onChangePriceSort,
    clearAll,
    mainFilter: filteredProducts,
  } = useSearchFilter(data);

  const filterRef = useRef<any>();

  return (
    <div className="flex flex-col sm:flex-row p-6 relative">
      <nav
        ref={filterRef}
        className="w-80 absolute top-24 sm:static z-10 transition-transform duration-500 translate-x-[-110%]"
      >
        {/* filter */}
        <form className="shadow-light-stepIn max-w-80 py-5 px-4 rounded sticky top-[175px] sm:top-[80px] bg-white">
          <p className="text-lg font-bold pb-2">Filters</p>
          <ul className="flex flex-col gap-4">
            {/* price */}
            <li>
              <p className="font-semibold">Sort By</p>
              <div className="flex flex-col">
                {/* sort by price high to low */}
                <div className="flex gap-2 items-center">
                  <input
                    id="lowestFirst"
                    type="radio"
                    name="sortPrice"
                    onChange={(e) => onChangePriceSort(e, 1)}
                  />
                  <label htmlFor="lowestFirst">Lowest Price first</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="highestFirst"
                    type="radio"
                    name="sortPrice"
                    onChange={(e) => onChangePriceSort(e, -1)}
                  />
                  <label htmlFor="highestFirst">Highest Price first</label>
                </div>

                {/* Price range slider */}
                {/* <input
                  list="priceRange"
                  className="mt-3 text-black"
                  type="range"
                  min={1}
                  max={6}
                />
              <datalist id="priceRange">
                <option value="1000">1k</option>
                <option value="2000">2k</option>
                <option value="3000">3k</option>
                <option value="4000">4k</option>
                <option value="5000">5k</option>
              </datalist> */}
              </div>
            </li>

            {/* price */}
            <li>
              <p className="font-semibold">Price</p>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <input
                    id="ten"
                    type="checkbox"
                    name="ten"
                    onChange={(e) => onChangePriceRange(e, [0, 10])}
                  />
                  <label htmlFor="ten">Till $10</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="thirty"
                    type="checkbox"
                    name="thirty"
                    onChange={(e) => onChangePriceRange(e, [10, 30])}
                  />
                  <label htmlFor="thirty">$10 - $30</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="fifty"
                    type="checkbox"
                    name="fifty"
                    onChange={(e) => onChangePriceRange(e, [30, 50])}
                  />
                  <label htmlFor="fifty">$30 - $50</label>
                </div>
              </div>
            </li>

            {/* discount */}
            <li>
              <p className="font-semibold">Discount</p>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <input
                    id="ten"
                    type="checkbox"
                    name="ten"
                    onChange={(e) => {
                      onChangeDiscountFilter(e, [0, 10]);
                    }}
                  />
                  <label htmlFor="ten">Upto 10%</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="twentyfive"
                    type="checkbox"
                    name="twentyfive"
                    onChange={(e) => onChangeDiscountFilter(e, [0, 25])}
                  />
                  <label htmlFor="twentyfive">Upto 25%</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="more"
                    type="checkbox"
                    name="more"
                    onChange={(e) => onChangeDiscountFilter(e, [25, 100])}
                  />
                  <label htmlFor="more">More than 25%</label>
                </div>
              </div>
            </li>

            {/* ratings */}
            <li>{/* stars */}</li>
            <li>
              <button
                type="reset"
                className="px-4 py-1 bg-orange-600 text-white rounded"
                onClick={clearAll}
              >
                Reset
              </button>
            </li>
            <li>
              <p className="italic">
                Discounts are currently disabled at checkout.
              </p>
            </li>
          </ul>
        </form>
      </nav>

      <button
        onClick={(e: any) => {
          filterRef.current.classList.toggle("translate-x-0");
          let btnText = e.target;
          if (btnText.innerText === "Hide Filters") {
            btnText.textContent = "Show Filters";
          } else {
            btnText.textContent = "Hide Filters";
          }
        }}
        className="sm:hidden bg-orange-600 text-white px-4 py-1 w-fit self-end rounded"
      >
        Show Filters
      </button>

      <section className="h-full w-full mx-auto mt-10 sm:mt-0">
        <div className="grid gap-6 grid-cols-auto-1x lg:grid-cols-auto-2x items-center justify-center">
          <ProductsList
            queryData={{ data: filteredProducts(), isFetched, isError }}
          />
        </div>
      </section>
    </div>
  );
}

export default MainSearchShop;
