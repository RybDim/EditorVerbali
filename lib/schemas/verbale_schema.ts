import * as z from "zod";

export const verbaleSchema = z.object({
	numero: z.string().min(1, "Il numero del verbale è obbligatorio"),
	data: z.string().min(1, "La data è obbligatoria"),
	verbalizzante: z.string().min(1, "Il verbalizzante è obbligatorio"),
	direttore: z.string().min(1, "Il direttore è obbligatorio"),
});