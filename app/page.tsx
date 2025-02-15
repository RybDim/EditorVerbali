"use client";

import { LoginForm } from "@/components/auth/login_form";
import { authClient } from "@/lib/auth_client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authClient.getSession().then((session) => {
			if(session.data){
				router.replace("/dashboard");
			} else {
				setLoading(false);
			}
		});
	});

	if(loading) return null;

	return (
		<div className="flex items-center justify-center h-full">
			<LoginForm />
		</div>
	);
}
