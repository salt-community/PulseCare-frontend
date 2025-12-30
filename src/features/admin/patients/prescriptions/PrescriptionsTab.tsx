import { LucidePill, Trash } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/Card";
import type { Medication, Patient } from "../../../../lib/api/mockData";
import { AddPrescriptionForm } from "./AddPrescriptionForm";
import { Button } from "../../../../components/ui/PrimaryButton";
import { RenewPrescriptionForm } from "./RenewPrescriptionForm";

type MedicationProps = {
	patient: Patient;
	medications: Medication[];
};

export const PrescriptionsTab = ({ medications, patient }: MedicationProps) => {
	return (
		<>
			<div className="flex justify-start items-center">
				<AddPrescriptionForm patient={patient} />
			</div>
			<Card className="hover:shadow-none">
				<CardContent className="text-base">
					{medications.length === 0 ? (
						<p>No medications</p>
					) : (
						<ul className="space-y-2">
							{medications.map((med: Medication) => (
								<li key={med.id} className="flex flex-row justify-between items-center border-b py-2">
									<div className="flex items-center gap-2">
										<LucidePill className="text-primary w-5 h-5" />
										<div>
											<strong>{med.name}</strong> – {med.dosage}, {med.timesPerDay} times/day
											{med.instructions && (
												<div className="text-card-foreground text-sm">Instructions: {med.instructions}</div>
											)}
										</div>
									</div>
									<div className="flex gap-2">
										<RenewPrescriptionForm patient={patient} prescription={med} />
										<Button
											variant={"outline"}
											size={"icon"}
											className="hover:text-destructive-dark hover:bg-destructive-light [&_svg]:size-5"
										>
											<Trash />
										</Button>
									</div>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</>
	);
};
