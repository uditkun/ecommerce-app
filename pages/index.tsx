import Slider from "../components/Slider";
import Card from "../components/Card";
import products from "../dummyDB/products.json";

function HomePage() {
  return (
    <section className="mx-auto">
      <Slider />
      <div className="flex gap-4 flex-wrap justify-center lg:justify-start items-center relative mx-auto max-w-[1200px] px-5">
        {products.map((item) => (
          <Card key={item.id} item={item} helperLink="/products" />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
