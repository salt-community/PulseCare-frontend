import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";
import { mockMedications } from "../../../lib/api/mockData";
import { Pill } from "../../../components/ui/Pill";
import { Calendar, Pill as PillIcon, InfoIcon, Clock } from "lucide-react";

export default function MedicationsPage() {
	const data = mockMedications;
	return (
		<>
			<h1>Medications</h1>
			<p>Your current prescriptions and medication schedule</p>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
				{data.map(medication => (
					<Card key={medication.id}>
						<CardHeader className="flex flex-row gap-4">
							<PillIcon className="w-6 h-6 shrink-0" />
							<div className="flex-1">
								<div className="flex justify-between items-center gap-2">
									<CardTitle className="text-lg">{medication.name}</CardTitle>
									<Pill>{medication.dosage}</Pill>
								</div>
							</div>
						</CardHeader>
						<CardContent className="flex flex-row gap-4">
							<div className="w-6 shrink-0" />
							<div className="flex-1 space-y-2 text-sm text-secondary-foreground">
								<div className="flex items-center gap-2">
									<Clock strokeWidth={2} height={15} />
									<span>
										x{medication.timesPerDay} daily ({medication.frequency})
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar strokeWidth={2} height={15} />
									<span>Started {medication.startDate}</span>
								</div>
								<div className="w-full border-t"></div>
							</div>
						</CardContent>
						<CardFooter>
							<div className="w-10 shrink-0" />
							<div className="flex items-center gap-2">
								<InfoIcon strokeWidth={2} height={15} />
								<span>{medication.instructions}</span>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}
