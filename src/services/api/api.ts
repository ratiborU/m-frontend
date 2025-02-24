'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


type TRequest = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type TApiProps = {
  type?: TRequest,
  data?: string | FormData | BodyInit | null | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data?: any) => void,
  onError?: (error: Error) => void,
  revalidate?: number,
  contentType?: string,
  next?: NextFetchRequestConfig | undefined,
  isRefresh?: boolean
}


export const api = async (link: string, props: TApiProps = {}) => {
  const {
    type = 'GET',
    data,
    next,
    onSuccess = () => { return },
    onError = (error: Error) => { return error },
    // isRefresh = false,
    // revalidate = type == "GET" ? 3600 : 0,
    contentType = 'application/json',
  } = props;

  const token = cookies().get('access')?.value
  const tags = link.split('/');
  // const contentType = 'application/json'
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };
  if (contentType == 'application/json') {
    headers['Content-type'] = 'application/json';
  }

  const response = await fetch(`http://localhost:5000/api/${link}`, {
    method: type,
    headers,
    next: { // сложно, нужно проверить
      revalidate: 86400, // Обновлять через день автоматически
      ...next,
      tags: type == "GET" ? link.split('/') : undefined,
    },
    // cache: "no-cache", // нельзя использовать с revalidate
    body: data
  })
    .then(response => {
      if (Number(response.status) >= 300) {
        throw new Error("", { cause: response.status })
      }
      return response.json();
    })
    .then(async (data) => {
      onSuccess(data);
      if (type != "GET") {
        revalidateTag(tags[0]);
      }
      return data;
    })
    .catch(async (error: Error) => {
      onError(error)
      // нужно лучше обрабатывать ошибки
      // возвращать то сообщение которое пришло с бека
      if (error.cause == 401) {
        redirect('/authorization/login')
      }
      console.error(error.cause);
      return error
    });

  return response;
}
