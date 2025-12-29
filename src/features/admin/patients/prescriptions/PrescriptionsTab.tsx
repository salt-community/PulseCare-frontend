import { LucidePill, Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { Medication } from "../../../../lib/api/mockData";

type MedicationProps = {
	medications: Medication[];
};

export const PrescriptionsTab = ({ medications }: MedicationProps) => {
	return (
		<Card className="shadow-sm rounded-xl">
			<div className="flex justify-between items-center">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<LucidePill className="w-5 h-5" /> Prescriptions
					</CardTitle>
					<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
						<Plus /> New Prescription
					</button>
				</CardHeader>
			</div>
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
	);
};
