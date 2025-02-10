import * as React from "react";

import { cn } from "@/lib/utils";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { FormValues } from "@/types/types";

export interface TextAreaProps extends React.ComponentProps<"textarea"> {
	name: FieldPath<FormValues>;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, name, ...props }, ref) => {
		const formContext = useFormContext<FormValues>();
		return (
			<Controller
				name={name}
				control={formContext.control}
				render={({ field }) => (
					<textarea
						{...field}
						value={typeof field.value === "string" ? field.value : ""}
						className={cn(
							"flex min-h-[60px] w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
Textarea.displayName = "Textarea";

export { Textarea };
