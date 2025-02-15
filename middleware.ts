import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";

export async function middleware(req: NextRequest){
	const sessionCookie = await getSessionCookie(req);
	if(!sessionCookie){
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/editor"],
};