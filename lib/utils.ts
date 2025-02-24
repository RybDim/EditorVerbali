import { FormValues } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { template } from "./template";

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

export async function generateVerbale(formData: FormValues): Promise<string> {
	const texDoc = await template(formData);
	try {
		const response = await fetch("/api/compile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tex_string: texDoc }),
		});

		if (!response.ok) {
			throw new Error("Pdf generation failed");
		}

		const data = await response.json();
		return data.pdf;
	} catch (error) {
		console.log("Error generating pdf: ", error);
		throw error;
	}
}
