import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/cards.module.scss";

const Cards = ({ posts = [] }) => {
  const router = useRouter();
  const cards = posts.data
    ?.filter((item, index) => index < 8)
    .map((item) => (
      <div key={item.id} className={styles.card}>
        <img src={item.media_url} alt={item.capture} />
        <div
          className={styles.advice}
          onClick={() => router.push(item.media_url)}
        >
          <p>
            пишите ваши вопросы <br></br> в комментарии
          </p>
          <p>&#128071; &#128071; &#128071;</p>
        </div>
      </div>
    ));

  return (
    <section className={styles.wrapperCards}>
      <h1 className={styles.title}>Instagram</h1>
      <div className={styles.cards}>{cards}</div>
    </section>
  );
};

export default Cards;
