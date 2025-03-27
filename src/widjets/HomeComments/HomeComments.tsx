import React from 'react';
import Comment from '@/components/Comment/Comment';
import styles from './homeComments.module.css'
import { getAllComments } from '@/services/api/comments/commentService';
import Title from '@/components/Title/Tile';

const HomeComments = async () => {
  const comments = await getAllComments();
  return (
    <>
      <Title text='Отзывы наших покупателей' margin={false} />
      <div className={styles.block}>
        {...comments.rows.sort((a, b) => b.text.length - a.text.length).slice(0, 4).map(x => <Comment key={`home comment: ${x.id}`} {...x} />)}
      </div>
    </>

  );
};

export default HomeComments;