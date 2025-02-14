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
import { LoginSchema } from "@/lib/schemas/login_schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormError } from "./form_error";
import { FormSuccess } from "./form_success";
import Link from "next/link";

export function LoginForm() {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		console.log(values)
	};

	return (
		<CardWrapper
			title="Accedi"
			headerLabel="Bentornato"
			backButtonLabel="Non hai un account?"
			backButtonHref="/register"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
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
									<div className="flex justify-between items-center h-min">
										<FormLabel>Password</FormLabel>
										<Button variant="link" className="font-normal h-min" size="sm" asChild>
											<Link className="" href="">Password dimenticata?</Link>
										</Button>
									</div>
									<FormControl>
										<input
											{...field}
											className={cn(
												"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
											)}
											type="password"
											placeholder="******"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message="" />
					<FormSuccess message="" />
					<Button type="submit" className="w-full">
						Accedi
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
