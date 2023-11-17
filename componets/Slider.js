import React, { useEffect, useState } from "react";
import { slides } from "../utils/consts";
import styles from "../styles/slider.module.scss";

const Slider = () => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setIntervalId(
      setInterval(
        () => setActiveSlider((state) => (state + 1 < 3 ? state + 1 : 0)),
        5000
      )
    );
  }, []);

  const clickHandler = (index) => {
    setActiveSlider(index);

    if (!!intervalId) {
      setIntervalId(null);
      clearInterval(intervalId);
    }
  };

  const slidesContent = slides.map(
    ({ scale, rating, title, description } = item) => (
      <div key={rating} className={styles.slide}>
        <div>
          <h1>{rating}</h1>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <h2>{scale}</h2>
      </div>
    )
  );

  const paginations = slides.map((item, index) => (
    <div
      key={index}
      className={`${styles.circle} ${
        activeSlider === index ? styles.active : null
      }`}
      onClick={() => clickHandler(index)}
    ></div>
  ));

  return (
    <section className={styles.wrapperSlider}>
      <div className={styles.slider}>
        <div className={styles.wrapperContent}>
          <div
            className={styles.content}
            style={{ marginTop: `-${activeSlider * 387}px` }}
          >
            {slidesContent}
          </div>
        </div>
        <div className={styles.pagination}>{paginations}</div>
      </div>
    </section>
  );
};

export default Slider;
