import { FormValues } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { template } from "./template";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('it-IT', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

export async function generateVerbale(formData: FormValues, sections: string[]): Promise<string> {
	const texDoc = await template(formData, sections);
	try {
		const response = await axios.post("/api/compile", {
			tex_string: texDoc,
		}, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data.pdf;
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw error;
	}
}
