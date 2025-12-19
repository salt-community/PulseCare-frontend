import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";
import { mockMedications } from "../../../lib/api/mockData";
import { Pill } from "../../../components/ui/Pill";
import { Calendar, Pill as PillIcon, InfoIcon, Clock } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";

export default function MedicationsPage() {
	const data = mockMedications;
	return (
		<>
			<PageHeader title={"Medications"} description="Your current prescriptions and medication schedule" />
			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 mt-2">
				{data.map(medication => (
					<Card key={medication.id}>
						<CardHeader className="flex flex-row gap-4">
							<PillIcon className="w-6 h-8 shrink-0 text-primary" />
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
									<Clock strokeWidth={2} height={14} color="grey" />
									<span className="text-foreground/60">
										x{medication.timesPerDay} {medication.frequency}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar strokeWidth={2} height={14} color="grey" />
									<span className="text-foreground/60">Started {medication.startDate}</span>
								</div>
								<div className="w-full border-t border-gray-300"></div>
							</div>
						</CardContent>
						<CardFooter>
							<div className="w-10 shrink-0" color="foreground" />
							<div className="flex items-center gap-2 color-foreground/60 text-sm">
								<InfoIcon strokeWidth={2} height={14} color="grey" />
								<span className="text-foreground/60">{medication.instructions}</span>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}
