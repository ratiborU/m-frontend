import EditComment from '@/widjets/comments/EditComment/EditComment';
import React from 'react';
import { getOneComment } from '@/services/api/comments/commentService';
import { getAllAnswersByCommentId } from '@/services/api/answers/answerService';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const comment = await getOneComment(id);
  const answers = await getAllAnswersByCommentId(id)

  return (
    <div>
      <EditComment {...comment} answer={answers[0]} />
    </div>
  );
};

export default page;