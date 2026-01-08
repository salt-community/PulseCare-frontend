import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "../../../../components/ui/PrimaryButton";
import { EditPrescriptionForm } from "./EditPrescriptionForm";
import { DeleteConfirmationModal } from "../../../../components/shared/DeleteConfirmationModal";
import type { Medication, PatientDetailsVm, UpdateMedicationDto } from "../../../../lib/types";

type Props = {
	patient: PatientDetailsVm;
	med: Medication;
	onUpdate: (dto: UpdateMedicationDto) => void;
	onDelete: () => void;
};

export const PrescriptionItem = ({ patient, med, onUpdate, onDelete }: Props) => {
	const formatDate = (iso: string | null | undefined) => {
		if (!iso) return "—";
		return new Date(iso).toLocaleDateString("en-GB", {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	};

	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<div className="border-t border-foreground/10 pt-4 first:border-t-0 first:pt-0">
			<div className="flex items-start justify-between gap-4 mb-3">
				<div className="flex-1">
					<p className="font-semibold text-foreground text-base">
						{med.name} – {med.dosage}
					</p>
					<p className="text-sm text-muted-foreground mt-1">{med.timesPerDay} times per day</p>
					<p className="text-sm text-muted-foreground mt-1">
						Start date: {formatDate(med.startDate)}
						{med.endDate && <> – End date: {formatDate(med.endDate)}</>}
					</p>
				</div>

				<div className="flex gap-2 shrink-0">
					<EditPrescriptionForm patient={patient} prescription={med} onSubmit={onUpdate} />

					<Button
						variant="outline"
						size="icon"
						onClick={() => setDeleteOpen(true)}
						className="hover:text-destructive-dark hover:bg-destructive-light [&_svg]:size-5"
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

			<DeleteConfirmationModal
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				medicationName={med.name}
				onConfirm={() => {
					onDelete();
					setDeleteOpen(false);
				}}
			/>
		</div>
	);
};
