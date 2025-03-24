import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl

  if (url.searchParams.has('tmp')) {

    url.searchParams.delete('tmp')

    const cleanUrl = url.toString()

    return NextResponse.redirect(cleanUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/', 
}
