import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
	const response = await axios.get(
		"https://web.dmi.unict.it/elenchi/consiglio-di-dipartimento"
	);

	return new NextResponse(response.data);
}
