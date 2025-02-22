import { TAnswer } from '@/services/api/answers/answerType';
import { TComment } from '@/services/api/comments/commentType';
import EditComment from '@/widjets/comments/EditComment/EditComment';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const response = await fetch(`http://localhost:5000/api/comments/${id}`, { cache: 'no-cache' });
  const comment: TComment = await response.json();


  const responseAnswer = await fetch(`http://localhost:5000/api/answers/byCommentId/${id}`, { cache: 'no-cache' });
  const answers: TAnswer[] = await responseAnswer.json();

  return (
    <div>
      <EditComment {...comment} answer={answers[0]} />
    </div>
  );
};

export default page;