import { useState } from "react";
import { Product } from "../utils/types/Product";

type UserInput = {
  priceOrder: number;
  priceRange: [number, number][];
  discount: [number, number][];
};

const useSearchFilter = (products: Product[]) => {
  const [userInput, setUserInput] = useState<UserInput>({
    priceOrder: 0,
    priceRange: [],
    discount: [],
  });

  const onChangePriceSort = (e: any, priceOrder: number) => {
    if (e.target.checked) {
      setUserInput((userInput) => {
        return { ...userInput, priceOrder };
      });
    }
  };

  const onChangePriceRange = (e: any, priceRange: [number, number]) => {
    if (e.target.checked) {
      setUserInput((userInput) => {
        return {
          ...userInput,
          priceRange: [...userInput.priceRange, priceRange],
        };
      });
    } else {
      const newPriceRangeArr = userInput.priceRange.filter(
        (item: any) => !(item[0] === priceRange[0] && item[1] === priceRange[1])
      );
      setUserInput((userInput) => {
        return { ...userInput, priceRange: newPriceRangeArr };
      });
    }
  };

  const onChangeDiscountFilter = (e: any, discount: [number, number]) => {
    if (e.target.checked) {
      setUserInput((userInput) => {
        return { ...userInput, discount: [...userInput.discount, discount] };
      });
    } else {
      const newDiscountArr = userInput.discount.filter(
        (item: any) => !(item[0] === discount[0] && item[1] === discount[1])
      );
      setUserInput((userInput) => {
        return { ...userInput, discount: newDiscountArr };
      });
    }
  };

  const mainFilter = () => {
    let filteredProducts = products?.slice();

    filteredProducts = filteredProducts?.sort(
      (a: Product, b: Product) =>
        Math.sign(userInput.priceOrder) * (a.price - b.price)
    );

    if (userInput.priceRange.length) {
      let maxPrice = Math.max(...userInput.priceRange.flat(1));
      let minPrice = Math.min(...userInput.priceRange.flat(1));
      //
      filteredProducts = filteredProducts?.filter(
        (item: Product) => item.price >= minPrice && item.price <= maxPrice
      );
    }

    if (userInput.discount.length) {
      let maxDiscount = Math.max(...userInput.discount.flat(1));
      let minDiscount = Math.min(...userInput.discount.flat(1));

      filteredProducts = filteredProducts?.filter((item: Product) => {
        if (!item.discount) {
          return;
        }
        return item.discount >= minDiscount && item.discount <= maxDiscount;
      });
    }

    return filteredProducts;
  };

  const clearAll = () => {
    setUserInput({
      priceOrder: 0,
      priceRange: [],
      discount: [],
    });
  };
  return {
    mainFilter,
    onChangeDiscountFilter,
    onChangePriceRange,
    onChangePriceSort,
    clearAll,
  };
};

export default useSearchFilter;
