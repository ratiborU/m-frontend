import { getCommentsByPersonId } from '@/services/api/comments/commentService';
import ProfileComments from '@/widjets/profilePages/Comments/ProfileComments';
import { cookies } from 'next/headers';
import React from 'react';

const page = async () => {
  const comments = await getCommentsByPersonId(cookies().get('personId')?.value || 0)

  return (
    <ProfileComments comments={comments} />
  );
};

export default page;