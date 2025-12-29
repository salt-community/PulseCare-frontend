import { LucidePill, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { Medication, Patient } from "../../../../lib/api/mockData";
import { AddPrescriptionForm } from "./AddPrescriptionForm";

type MedicationProps = {
	patient: Patient;
	medications: Medication[];
};

export const PrescriptionsTab = ({ medications, patient }: MedicationProps) => {
	return (
		<>
			<div className="flex justify-between items-center">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<LucidePill className="w-5 h-5" /> Prescriptions
					</CardTitle>
				</CardHeader>
				<AddPrescriptionForm patient={patient} />
			</div>
			<Card className="shadow-sm rounded-xl">
				<CardContent className="text-base">
					{medications.length === 0 ? (
						<p>No medications</p>
					) : (
						<ul className="space-y-2">
							{medications.map((med: Medication) => (
								<li key={med.id} className="flex flex-col md:flex-row md:justify-between md:items-center border-b py-2">
									<div className="flex items-center gap-2">
										<LucidePill className="text-primary w-5 h-5" />
										<div>
											<strong>{med.name}</strong> – {med.dosage}, {med.timesPerDay} times/day
											{med.instructions && (
												<div className="text-card-foreground text-sm">Instructions: {med.instructions}</div>
											)}
										</div>
									</div>
									<button className="mt-2 md:mt-0 text-gray-500 hover:text-gray-700 transition">
										<Trash />
									</button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</>
	);
};
