"use client";

import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardWrapperProps {
	children: React.ReactNode;
	title: string;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
}

export function CardWrapper({
	children,
	title,
	headerLabel,
	backButtonLabel,
	backButtonHref,
}: CardWrapperProps) {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{headerLabel}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<Button variant="link" className="font-normal w-full" size="sm" asChild>
					<Link href={backButtonHref}>{backButtonLabel}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
