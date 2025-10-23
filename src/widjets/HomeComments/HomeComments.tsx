import React from 'react';
import styles from './homeComments.module.css'
import Title from '@/components/Title/Tile';
import CommentHome from '@/components/Comment/CommentHome';

const comments = [
  {
    "id": 1,
    "text": "Купила серьги NINA для прокола ушей своей дочери, и они оказались отличным выбором! Очень красивый дизайн и удобный механизм. Процесс прокола прошел безболезненно, и сейчас у дочки красивые ушки. Рекомендую!",
    // "text": "Заказывала серьги для себя и дочери, остались в восторге! Все сделано аккуратно, никаких отеков или дискомфорта. Профессиональный подход и отличное качество. Спасибо!",
    "rate": 5,
    "createdAt": "2025-03-22T08:16:42.300Z",
    "updatedAt": "2025-03-22T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "Иванова",
      "secondName": "Мария",
      "fatherName": "",
    }
  },
  {
    "id": 2,
    "text": "Серьги NINA просто супер! Я долго искала подходящие серьги для прокала, и эти идеально подошли. Качественный материал и красивый вид. Прокалывали уши в клинике, но сам процесс прошел отлично!",
    "rate": 5,
    "createdAt": "2025-03-25T08:16:42.300Z",
    "updatedAt": "2025-03-25T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "Кузнецова",
      "secondName": "Анна",
      "fatherName": "",
    }
  },
  {
    "id": 3,
    "text": "Недавно купила серьги NINA для прокола ушей своей дочке, и она в восторге! Серьги очень красивые и аккуратные. Сам процесс прокола прошел быстро и безболезненно благодаря качественным иглам. Теперь у дочки модные ушки, и она счастлива. Рекомендую всем!",
    "rate": 5,
    "createdAt": "2025-03-25T13:16:42.300Z",
    "updatedAt": "2025-03-25T13:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "Васильева",
      "secondName": "Наталья",
      "fatherName": "",
    }
  },
  {
    "id": 4,
    "text": "Все понравилось 👍",
    "rate": 5,
    "createdAt": "2025-03-31T08:16:42.300Z",
    "updatedAt": "2025-03-31T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "Ковалев",
      "secondName": "Сергей",
      "fatherName": "",
    }
  }
]

const HomeComments = async () => {
  // const comments = await getAllComments();
  return (
    <>
      <Title text='Отзывы наших покупателей' margin={false} />
      <div className={styles.block}>
        {...comments.sort((a, b) => b.text.length - a.text.length).slice(0, 4).map(x => <CommentHome key={`home comment: ${x.id}`} {...x} />)}
      </div>
    </>

  );
};

export default HomeComments;