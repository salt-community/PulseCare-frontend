import { LucidePill, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { Medication, Patient } from "../../../../lib/api/mockData";
import { AddPrescriptionForm } from "./AddPrescriptionForm";
import { Button } from "../../../../components/ui/PrimaryButton";
import { EditPrescriptionForm } from "./EditPrescriptionForm";
import Spinner from "../../../../components/shared/Spinner";

export const PrescriptionsTab = ({
	patient,
	medications,
	isLoading,
	isError
}: {
	patient: Patient;
	medications: Medication[];
	isLoading: boolean;
	isError: boolean;
}) => {
	return (
		<>
			<div className="w-fit">
				<AddPrescriptionForm patient={patient} />
			</div>

			<Card className="hover:shadow-none h-max">
				<CardHeader className="p-5 pb-3">
					<CardTitle className="text-lg flex items-center gap-2 text-foreground">
						<LucidePill className="h-5 w-5 text-primary" size={20} />
						Prescriptions
					</CardTitle>
				</CardHeader>

				<CardContent className="p-6 pt-0">
					{isLoading && (
						<>
							<p>Loading prescriptions...</p>
							<Spinner />
						</>
					)}

					{isError && <p className="text-destructive text-sm">Failed to load medications</p>}

					{!isLoading && medications.length === 0 ? (
						<p className="text-muted-foreground text-sm">No medications prescribed</p>
					) : (
						<div className="space-y-4">
							{medications.map((med: Medication) => (
								<div key={med.id} className="border-t border-foreground/10 pt-4 first:border-t-0 first:pt-0">
									<div className="flex items-start justify-between gap-4 mb-3">
										<div className="flex-1">
											<p className="font-semibold text-foreground text-base">
												{med.name} – {med.dosage}
											</p>
											<p className="text-sm text-muted-foreground mt-1">{med.timesPerDay} times per day</p>
										</div>
										<div className="flex gap-2 shrink-0">
											<EditPrescriptionForm patient={patient} prescription={med} />
											<Button
												variant="outline"
												size="icon"
												className="hover:text-destructive-dark hover:bg-destructive-light [&_svg]:size-4"
											>
												<Trash />
											</Button>
										</div>
									</div>

									{med.instructions && (
										<p className="text-sm text-card-foreground mt-2">
											<span className="font-semibold text-foreground">Instructions:</span> {med.instructions}
										</p>
									)}
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};
