import React, { useCallback, useState } from "react";
import { sendMessageEmail } from "../http/emailAPI";
import { checkPhoneNumber } from "../utils/functions.js";
import styles from "../styles/wrapperModal.module.scss";

const WrapperModal = ({ children }) => {
  const defaultUser = {
    phone: "",
    name: "",
    check: false,
  };

  const [user, setUser] = useState(defaultUser);

  const checkValidate = (type) => {
    switch (type) {
      case "phone":
        return checkPhoneNumber(user.phone);
      case "name":
        return user.name.trim() !== "";
      default:
        return false;
    }
  };

  const [errors, setErrors] = useState({
    phone: false,
    name: false,
    check: false,
  });

  const addPropertyUser = (e) => {
    setUser((state) => {
      return {
        ...state,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const clickHandler = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        if (checkValidate("name") && checkValidate("phone") && user.check) {
          const data = await sendMessageEmail({
            phone: user.phone,
            name: user.name,
          });

          if (!!data.errors) {
            data?.errors?.errors?.map((item) => alert(item.msg));
          } else {
            setUser(defaultUser);
            setErrors({
              name: !checkValidate("name"),
              phone: !checkValidate("phone"),
              check: !user.check,
            });
            alert("сообщение отправлено");
          }
        } else {
          setErrors({
            name: !checkValidate("name"),
            phone: !checkValidate("phone"),
            check: !user.check,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [user, sendMessageEmail, setErrors, checkValidate]
  );

  return (
    <section className={styles.wrapperModal}>
      <div className={styles.modal}>
        <form className={styles.formCall}>
          <div className={styles.content}>
            <p className={styles.title}>Обратный звонок</p>
            <input
              name="name"
              type="text"
              placeholder="Ваше имя"
              className={errors.name ? styles.error : ""}
              value={user.name}
              onChange={(e) => addPropertyUser(e)}
            />
            <input
              name="phone"
              type="phone"
              placeholder="Номер телефона"
              className={errors.phone ? styles.error : ""}
              value={user.phone}
              onChange={(e) => addPropertyUser(e)}
            />
            <div className={styles.checkboxWithLabel}>
              <input
                name="check"
                type="checkbox"
                checked={user.check}
                onChange={(e) => addPropertyUser(e)}
              />
              <label className={errors.check ? styles.errorText : ""}>
                Согласие на обработку персональных данных
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={(e) => clickHandler(e)}
          >
            Отправить &#8594;
          </button>
        </form>
      </div>
      {children}
    </section>
  );
};

export default WrapperModal;
