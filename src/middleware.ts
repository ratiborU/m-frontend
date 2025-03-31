import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { setCookies } from './services/api/authorizationService';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  if (!request.cookies.get('access') && !!request.cookies.get('refresh')) {
    const response = NextResponse.redirect(url)
    const tokens = await fetch('http://localhost:5000/api/persons/refresh', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: cookies().get('refresh')?.value
      })
    })
      .then(response => response.json())

    const accessExpiresAt = new Date(Date.now() + 1 * 1 * 1 * 20 * 1000); // 1 дней
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

    response.cookies.set("access", tokens.tokens.accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessExpiresAt,
    });
    response.cookies.set("refresh", tokens.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshExpiresAt,
    });
    return response;
  }

  // console.log(request.cookies.get('access'));
  // console.log(request.cookies.get('refresh'));
  // console.log(request.cookies.get('personId'));

  if (!request.cookies.get('access') && !request.cookies.get('refresh') && !request.cookies.get('personId')) {
    console.log('create empty person');
    const response = NextResponse.redirect(url)
    const responseFetch = await fetch('http://localhost:5000/api/persons/empty', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(response => response.json())

    const accessExpiresAt = new Date(Date.now() + 1 * 1 * 1 * 20 * 1000); // 1 дней
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
    const personIdExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 дней

    response.cookies.set("access", responseFetch.tokens.accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessExpiresAt,
    });
    response.cookies.set("refresh", responseFetch.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshExpiresAt,
    });
    response.cookies.set("personId", responseFetch.person.id, {
      httpOnly: true,
      secure: true,
      expires: personIdExpiresAt,
    });
    return response;
  }
  return
  // return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/admin/:path*',
    // '/about/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}