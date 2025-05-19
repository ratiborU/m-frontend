import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.mainBlock}>
          <p className={styles.footerLogo}>Mircos</p>
          <p className={styles.footerLogoText}>
            Магазин серег для прокалывания ушей Nina и косметических товаров.
          </p>
          <p className={styles.footerLogoText}>
            Официальный дистрибьютор Nina в Российской федерации
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Контакты</p>
            <p className={styles.columnText}>ООО Mircos</p>
            <p className={styles.columnText}>+7 (902) 870-67-40</p>
            <p className={styles.columnText}>info@niname.ru</p>
            <div>
              <p className={styles.columnText}>г. Екатеринбург, ул. Ленина, д. 99</p>
              {/* <p className={styles.columnText}>ул. Ленина, д. 99</p> */}
            </div>
          </div>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Помощь</p>
            <p className={styles.columnText}>Как заказать товар</p>
            <p className={styles.columnText}>Способы оплаты</p>
            <p className={styles.columnText}>Доставка и оплата</p>
            <p className={styles.columnText}>Возврат товара</p>
            <p className={styles.columnText}>Возврат денежных средств</p>
          </div>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Информация</p>
            <p className={styles.columnText}>О нас</p>
            <p className={styles.columnText}>О серьгах Nina</p>
            <p className={styles.columnText}>Политика конфиденциальности</p>
            <p className={styles.columnText}>Политика обработки персональных данных</p>
            <p className={styles.columnText}>Карта сайта</p>
          </div>
        </div>

      </div>
      <p className={styles.footerBottomText}>© 2018 - 2025 Mircos</p>
    </footer>
  );
};

export default Footer;