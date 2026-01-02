import { Card, CardContent } from "../../../components/ui/Card";
import { mockMedications } from "../../../lib/api/mockData";
import { Pill } from "../../../components/ui/Pill";
import { Calendar, Pill as PillIcon, InfoIcon, Clock } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Icon } from "../../../components/shared/Icon";

export default function MedicationsPage() {
	const data = mockMedications;
	return (
		<>
			<PageHeader title={"Medications"} description="Your current prescriptions and medication schedule" />
			<div className="grid gap-4 lg:grid-cols-2">
				{data.map((medication, index) => (
					<Card
						key={medication.id}
						className="transition-shadow animate-slide-up hover:shadow-none"
						style={{ animationDelay: `${index * 0.1}s` }}
					>
						<CardContent className="p-5">
							<div className="flex items-start gap-4">
								<Icon variant="red">
									<PillIcon className="h-6 w-6 text-accent-foreground" />
								</Icon>

								<div className="flex-1">
									<div className="flex items-start justify-between gap-2 mb-2">
										<h3 className="font-semibold text-lg text-foreground">{medication.name}</h3>
										<Pill>{medication.dosage}</Pill>
									</div>

									<div className="space-y-2 text-sm">
										<div className="flex items-center gap-2 text-muted-foreground">
											<Clock className="h-4 w-4" />
											<span>
												{medication.timesPerDay}x daily ({medication.frequency})
											</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Calendar className="h-4 w-4" />
											<span>Started {medication.startDate}</span>
										</div>
										{medication.instructions && (
											<div className="flex items-start gap-2 text-muted-foreground mt-3 pt-3 border-t border-border">
												<InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
												<span>{medication.instructions}</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
