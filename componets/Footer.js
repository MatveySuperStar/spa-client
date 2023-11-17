import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>Выполнил</p>
        <Link href="https://github.com/MatveySuperStar" target="_blank">
          Матвей Сергеев
        </Link>
      </div>
      <div>
        <p>Телефон</p>
        <Link href="tel:+375447678946">+375 (44) 76-78-946</Link>
      </div>
    </footer>
  );
};

export default Footer;
