import * as React from "react";

import { cn } from "@/lib/utils";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { FormValues } from "@/types/types";

export interface InputProps extends React.ComponentProps<"input"> {
	name?: FieldPath<FormValues>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, name, ...props }, ref) => {
		const formContext = useFormContext<FormValues>();
		return (
			<Controller
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				name={name ? name : ""}
				control={formContext.control}
				render={({ field }) => (
					<input
						{...field}
						value={typeof field.value === "string" ? field.value : ""}
						type={type}
						className={cn(
							"flex h-9 w-full bg-accent focus:bg-transparent rounded-md border border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							className,
						)}
						ref={ref}
						{...props}
					/>
				)}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
