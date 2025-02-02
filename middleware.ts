// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const protectedRoutes = ['/admin/products'];
// const publicRoutes = ['/'];

// // This function can be marked `async` if using `await` inside
// export default async function middleware(request: NextRequest) {
//   // const path = request.nextUrl.pathname;
//   // const isProtectedRoute = protectedRoutes.includes(path)
//   console.log('middleware');

//   // const cookie = cookies().get('access')?.value
//   // console.log(cookie);
//   // return NextResponse.redirect("/authorization/login")
//   // return NextResponse.redirect(new URL('/authorization/login', request.url))
// }

// // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: '/authorization/login',
// // }