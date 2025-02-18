import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { Trash } from "lucide-react"

interface VerbaleCardProps {
	verbale: {
		id: string
		data: {
			numero: string
			data: string
			verbalizzante: string
			direttore: string
		}
		createdAt: string
	}
}

export function VerbaleCard({ verbale }: VerbaleCardProps) {
	const router = useRouter()

	return (
		<Card className="w-[250px]">
			<CardHeader>
				<div className="flex justify-between align-middle items-center">
					<CardTitle className="text-lg">Verbale n. {verbale.data.numero}</CardTitle>
					<Trash className="w-4 h-4" />
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="text-sm text-muted-foreground">
						Data: {formatDate(verbale.data.data)}
					</div>
					<div className="text-sm text-muted-foreground">
						Verbalizzante: {verbale.data.verbalizzante}
					</div>
					<div className="text-sm text-muted-foreground">
						Direttore: {verbale.data.direttore}
					</div>
					<div className="pt-4">
						<Button
							variant="outline"
							onClick={() => router.push(`/editor/${verbale.id}`)}
						>
							Modifica
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
