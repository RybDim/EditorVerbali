import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest, 
	{ params }: { params: Promise<{ id: string }> }
) {
	try{
		const id = (await params).id;
		const verbale = await prisma.verbale.findUnique({
			where: {
				id: id,
			}
		});

		return NextResponse.json({
			verbale: verbale,
		}, {
			status: 200,
		})

	} catch(error) {
		if(error instanceof Prisma.PrismaClientKnownRequestError){
			return NextResponse.json({
				error: `Errore nella prelevazione del verbale:  ${error.message}`
			}, {
				status: 500
			});
		}
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id;
		const data = await req.json();
		const updatedVerbale = await prisma.verbale.update({
			where: {
				id: id,
			},
			data: {
				data: data.data,
				sections: data.sections,
				base64: data.base64
			}
		});

		return NextResponse.json({
			updatedVerbale: updatedVerbale,
		}, {
			status: 200
		})

	} catch(error) {
		if(error instanceof Prisma.PrismaClientKnownRequestError){
			return NextResponse.json({
				error: `Errore nell'aggiornamento del verbale: ${error.message}`
			}, {
				status: 500
			});
		}
	}
}
