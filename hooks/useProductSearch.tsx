import { useState } from "react";
import { useQuery } from "react-query";

const useProductSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const fetchData = async (searchQuery: string) => {
    const res = await fetch(`${location.origin}/api/products/${searchQuery}`);
    const data = await res.json();
    return data;
  };

  return {
    queryData: useQuery({
      queryKey: ["searchKey", searchValue],
      queryFn: () => fetchData(searchValue),
      enabled: Boolean(searchValue),
      staleTime: 10 * 60000,
    }),
    setSearchValue,
  };
};

export default useProductSearch;
