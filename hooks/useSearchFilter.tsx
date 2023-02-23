import { useState } from "react";

type UserInput = {
  priceOrder: number;
  priceRange: [number, number][];
  discount: [number, number][];
};

const useSearchFilter = (products: any) => {
  const [userInput, setUserInput] = useState<UserInput>({
    priceOrder: 0,
    priceRange: [],
    discount: [],
  });
  console.log(products);

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
    // console.log(filteredProducts);

    filteredProducts = filteredProducts?.sort(
      (a: any, b: any) =>
        Math.sign(userInput.priceOrder) *
        (Number(a.price.slice(1)) - Number(b.price.slice(1)))
    );
    // console.log(filteredProducts);

    if (userInput.priceRange.length) {
      let maxPrice = Math.max(...userInput.priceRange.flat(1));
      let minPrice = Math.min(...userInput.priceRange.flat(1));
      // console.log(minPrice, maxPrice);
      filteredProducts = filteredProducts?.filter(
        (item: any) =>
          Number(item.price.slice(1)) >= minPrice &&
          Number(item.price.slice(1) <= maxPrice)
      );
      // console.log(filteredProducts);
    }

    if (userInput.discount.length) {
      let maxDiscount = Math.max(...userInput.discount.flat(1));
      let minDiscount = Math.min(...userInput.discount.flat(1));

      filteredProducts = filteredProducts?.filter(
        (item: any) =>
          item.discount >= minDiscount && item.discount <= maxDiscount
      );
      // console.log(filteredProducts);
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
