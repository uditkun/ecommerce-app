import Link from "next/link";

function Footer() {
  return (
    <footer className="text-white bg-gray-800 text-center">
      &copy;E-shop {new Date().getFullYear()} by{" "}
      <Link
        href="https://github.com/uditkun"
        target="_blank"
        className="underline text-blue-500"
      >
        Me
      </Link>
    </footer>
  );
}

export default Footer;
