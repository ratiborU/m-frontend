import { getAllComments } from '@/services/api/comments/commentService';
import CommentsTable from '@/widjets/comments/CommentsTable/CommentsTable';
import React from 'react';

const page = async () => {
  const comments = await getAllComments();
  return (
    <div>
      <CommentsTable comments={comments.rows} />
    </div>
  );
};

export default page;