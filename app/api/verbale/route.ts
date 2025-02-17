import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: req.headers,
	});

	try{
	
		const verbaleList = await prisma.verbale.findMany({
			where: {
				userId: session?.user.id
			}
		});
		console.log(verbaleList);
		
		return NextResponse.json({
			verbali: verbaleList
		})
	}catch(error){
	
		if(error instanceof Prisma.PrismaClientKnownRequestError){
			return NextResponse.json({
				error: `Errore nella creazione del verbale: ${error.message}`
			}, {
				status: 500
			});
		}
	}

	return NextResponse.json({
		error: "Errore sconosciuto"
	}, {
		status: 500
	});
}

export async function POST(req: NextRequest){
	const data = await req.json();
	const session = await auth.api.getSession({
		headers: req.headers
	});

	if(!session?.user.id) {
		return NextResponse.json({
			error: "Utente non autorizzato"
		}, {
			status: 401
		})
	}

	try{
		const createdVerbale = await prisma.verbale.create({
			data: {
				userId: session?.user.id as never,
				data: data,
			}
		});

		return NextResponse.json(createdVerbale);
	
	}catch(error){
	
		if(error instanceof Prisma.PrismaClientKnownRequestError){
			return NextResponse.json({
				error: `Errore nella creazione del verbale: ${error.message}`
			}, {
				status: 500
			});
		}
	}

	return NextResponse.json({
		error: "Errore sconosciuto"
	}, {
		status: 500
	});
}