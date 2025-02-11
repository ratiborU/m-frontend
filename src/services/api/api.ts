'use server'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

type TApiProps = {
  link: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data?: any) => void,
  onError?: (error: Error) => void,
  revalidate?: string,
  next?: NextFetchRequestConfig | undefined,
  data?: object,
  type?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}


export const api = async (props: TApiProps) => {
  const {
    link,
    data,
    type,
    next,
    onSuccess = () => { return },
    onError = (error: Error) => { return error },
    revalidate
  } = props;
  const token = cookies().get('token')?.value

  const response = await fetch(`http://localhost:5000/api/${link}`, {
    method: type,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    next,
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(async (data) => {
      onSuccess(data);
      return data;
    })
    .catch(error => {
      onError(error)
      console.log(error);
    });
  revalidateTag(revalidate || '');
  return response;
}

// fetch
// then error
// onSuccess
// onError
// check token
// check refresh token
//  