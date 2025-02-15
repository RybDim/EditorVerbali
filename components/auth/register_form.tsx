"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormLabel,
	FormItem,
	FormField,
	FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card_wrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/lib/schemas/register_schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormError } from "./form_error";
import { FormSuccess } from "./form_success";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth_client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirm_password: "",
		},
	});

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	
	const router = useRouter();

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(async () => {
			const { name, email, password } = values;
			await authClient.signUp.email({
				name: name,
				password: password,
				email: email,
			}, {
				onRequest: (ctx) => {
					console.log(ctx);
				},
				onSuccess: (ctx) => {
					console.log(ctx);
					setSuccess("Registrazione avvenuta con successo");
					router.push("/dashboard");
				},
				onError: (ctx) => {
					setError(ctx.error.message);
				},
			});
		});
	};

	return (
		<CardWrapper
			title="Registrati"
			headerLabel="Benvenuto"
			backButtonLabel="Hai già un account?"
			backButtonHref="/"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<input
											{...field}
											className={cn(
												"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
											)}
											type="string"
											placeholder="Mario Rossi"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<input
											{...field}
											className={cn(
												"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
											)}
											type="email"
											placeholder="mail@esempio.com"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<input
											{...field}
											className={cn(
												"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
											)}
											type="password"
											placeholder="******"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirm_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Conferma password</FormLabel>
									<FormControl>
										<input
											{...field}
											className={cn(
												"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
											)}
											type="password"
											placeholder="******"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full">
						{isPending ? 
							(
								<Loader2 size={16} className="animate-spin" />
							) : (
							"Conferma"
							)
						}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
