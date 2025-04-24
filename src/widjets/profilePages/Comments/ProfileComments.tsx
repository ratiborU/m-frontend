import React from 'react';
import Comment from '@/components/Comment/Comment';
import { TComment } from '@/services/api/comments/commentType';
import styles from './profileComments.module.css'

type ProfileCommentsProps = {
  comments: TComment[]
}

const ProfileComments = (props: ProfileCommentsProps) => {
  const { comments } = props;
  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Ваши комментарии</h1>
      <div className={styles.comments}>
        {...comments.map(x => <Comment key={`profile comments: ${x.id}`} {...x} />)}
      </div>
    </div>

  );
};

export default ProfileComments;