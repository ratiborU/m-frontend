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