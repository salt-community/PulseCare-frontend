import { LucidePill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import { AddPrescriptionForm } from "./AddPrescriptionForm";
import type { Medication, PatientDetailsVm, UpdateMedicationDto } from "../../../../lib/types";
import { useCreateMedication, useDeleteMedication, useUpdateMedication } from "../../../../hooks/useMedication";
import { PrescriptionItem } from "./PrescriptionItem";

type PrescriptionsTabProps = {
	patient: PatientDetailsVm;
	medications: Medication[];
};

export const PrescriptionsTab = ({ patient, medications }: PrescriptionsTabProps) => {
	const createMedication = useCreateMedication(patient.id);
	const updateMedication = useUpdateMedication(patient.id);
	const deleteMedication = useDeleteMedication(patient.id);

	return (
		<>
			<div className="w-fit">
				<AddPrescriptionForm patient={patient} onSubmit={dto => createMedication.mutate(dto)} />
			</div>

			<Card className="hover:shadow-none h-max">
				<CardHeader className="p-5 pb-3">
					<CardTitle className="text-lg flex items-center gap-2 text-foreground">
						<LucidePill className="h-5 w-5 text-primary" size={20} />
						Prescriptions
					</CardTitle>
				</CardHeader>

				<CardContent className="p-6 pt-0">
					{medications.length === 0 ? (
						<p className="text-muted-foreground text-sm">No medications prescribed</p>
					) : (
						<div className="space-y-4">
							{medications.map((med: Medication) => (
								<PrescriptionItem
									key={med.id}
									patient={patient}
									med={med}
									onUpdate={(dto: UpdateMedicationDto) =>
										updateMedication.mutate({
											medicationId: med.id,
											dto
										})
									}
									onDelete={() => deleteMedication.mutate(med.id)}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};
