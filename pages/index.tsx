import Card from "../components/Card";
import { Product } from "../utils/types/Product";
import { useQuery } from "react-query";

function HomePage() {
  const {
    data: productsList,
    isError,
    isFetched,
    isLoading,
  } = useQuery(["searchKey", " "], async () => {
    const data = await fetch(`${location.origin}/api/products`);
    const res = await data.json();
    return res;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Oops! Some error occured.</p>;
  }
  return (
    <section className="mx-auto">
      <div className="flex gap-4 flex-wrap justify-center lg:justify-start items-center relative mx-auto max-w-[1200px] px-5">
        {isFetched &&
          productsList.map((item: Product) => (
            <Card key={item.id} item={item} helperLink="/products" />
          ))}
      </div>
    </section>
  );
}

export default HomePage;
