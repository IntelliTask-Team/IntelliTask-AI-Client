function Footer() {
  return (
    <div className="font-light flex flex-col justify-center content-center text-center text-white bg-jaune h-20 absolute bottom-0 w-full">
      <p>
        <a
          href="https://www.linkedin.com/in/kimidsinga/"
          target="blank"
          className="underline"
        >
          Kim
        </a>{" "}
        &{" "}
        <a
          href="https://www.linkedin.com/in/alexis-parsat-lacoste/"
          target="blank"
          className="underline"
        >
          Alexis
        </a>
      </p>
      <p className="mt-2">
        React JS | MongoBD | Mongoose | Express | Node JS | Tailwind CSS
      </p>
    </div>
  );
}

export default Footer;
