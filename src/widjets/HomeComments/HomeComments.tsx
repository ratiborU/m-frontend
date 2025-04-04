import React from 'react';
import styles from './homeComments.module.css'
import Title from '@/components/Title/Tile';
import CommentHome from '@/components/Comment/CommentHome';

const comments = [
  {
    "id": 1,
    "text": "Заказывала серьги для себя и дочери, остались в восторге! Все сделано аккуратно, никаких отеков или дискомфорта. Профессиональный подход и отличное качество. Спасибо!",
    "rate": 5,
    "createdAt": "2025-03-22T08:16:42.300Z",
    "updatedAt": "2025-03-22T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "admin",
      "secondName": "admin",
      "fatherName": "",
    }
  },
  {
    "id": 2,
    "text": "Классные серьги! Я переживала из-за качества, но все оказалось на высшем уровне. Быстрая доставка и хорошая упаковка — все на отлично!",
    "rate": 5,
    "createdAt": "2025-03-25T08:16:42.300Z",
    "updatedAt": "2025-03-25T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "admin",
      "secondName": "admin",
      "fatherName": "",
    }
  },
  {
    "id": 3,
    "text": "Все понравилось!",
    "rate": 5,
    "createdAt": "2025-03-25T13:16:42.300Z",
    "updatedAt": "2025-03-25T13:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "admin",
      "secondName": "admin",
      "fatherName": "",
    }
  },
  {
    "id": 4,
    "text": "Отличные серьги, всегда покупаю у этого продавца, качество не подводит, отличный материал и упаковка!",
    "rate": 5,
    "createdAt": "2025-03-31T08:16:42.300Z",
    "updatedAt": "2025-03-31T08:16:42.300Z",
    "productId": 6,
    "personId": 1,
    "person": {
      "id": 1,
      "firstName": "admin",
      "secondName": "admin",
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