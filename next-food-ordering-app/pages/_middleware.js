import { NextResponse } from 'next/server';

export async function middleware(request) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/api')) {
		const url = request.nextUrl.clone();
		url.protocol = 'http';

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/api/:path*'],
};
