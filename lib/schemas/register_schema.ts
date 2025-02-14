import * as z from "zod";

export const RegisterSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8, {
		message: "La password deve contenere almeno 8 caratteri",
	}),
	confirm_password: z.string()
})
.refine((data) => data.password === data.confirm_password, {
	message: "Password non corrisponde",
	path: ["confirm_password"],
});