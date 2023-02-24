import Slider from "../components/Slider";
import Card from "../components/Card";
import productsList from "../utils/productsList";

function HomePage() {
  return (
    <section className="mx-auto">
      <Slider />
      <div className="flex gap-4 flex-wrap justify-center lg:justify-start items-center relative mx-auto max-w-[1200px] px-5">
        {productsList.map((item) => (
          <Card key={item.id} item={item} helperLink="/products" />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
