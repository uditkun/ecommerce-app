import Image from "next/image";
const Slider = () => {
  return (
    <div className="w-full relative p-5">
      <ul className="w-full rounded-[4px] bg-gray-500">
        <li className="relative overflow-hidden">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
          />
        </li>
        <li className="relative overflow-hidden">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
          />
        </li>
        <li className="relative overflow-hidden">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
          />
        </li>
        <li className="relative overflow-hidden">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
          />
        </li>
      </ul>
    </div>
  );
};

export default Slider;
