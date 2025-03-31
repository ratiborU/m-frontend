import React from 'react';
import ProfileSettings from '@/widjets/profilePages/Settings/ProfileSettings';
import { getOnePerson } from '@/services/api/persons/personService';
import { cookies } from 'next/headers';


const page = async () => {
  const person = await getOnePerson(cookies().get('personId')?.value || 0);

  return (
    <>
      <ProfileSettings person={person} />
    </>
  );
};

export default page;