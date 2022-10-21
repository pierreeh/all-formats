import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const secretKey = process.env.NEXTAUTH_SECRET

  if (!secretKey) {
    return NextResponse.json({ message: 'Blocked for Server Problems' }, { status: 451 })
  }

  const session = await getToken({ req, secret: secretKey })

  if (!session?.role && (req.nextUrl.pathname.startsWith('/api/forum') || req.nextUrl.pathname.endsWith('/create'))) {
    return NextResponse.rewrite(`${process.env.NEXT_PUBLIC_BASEURL}/404`)
  }

  if (session?.role !== 'ADMIN' && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin'))) {
    return NextResponse.rewrite(`${process.env.NEXT_PUBLIC_BASEURL}/404`)
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: ['/admin/:path*', '/api/admin/:path*'],
// }