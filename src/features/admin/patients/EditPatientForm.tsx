import { useState } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";
import { PenIcon } from "lucide-react";
import type { PatientDetailsVm, UpdatePatientDto } from "../../../lib/types/patient";
import { toast } from "react-toastify";
import { useUpdatePatient } from "../../../hooks/usePatients";
import type { Update } from "vite/types/hmrPayload.js";
import { da } from "date-fns/locale";

type EditPatientFormProps = {
	patient: PatientDetailsVm;
	updatedPatient: UpdatePatientDto;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const EditPatientForm = ({ patient, onOpenChange }: EditPatientFormProps) => {
	const [open, setOpen] = useState(false);
	const [editedPatient, setEditedPatient] = useState<PatientDetailsVm | null>(null);
	const updateMutation = useUpdatePatient();

	const startEdit = () => {
		setEditedPatient({ ...patient });
		setOpen(true);
	};

	const saveEdit = () => {
		console.log("Save patient (mock):", editedPatient);
		setOpen(false);
	};

	const handleEditChange = async (field: keyof PatientDetailsVm, value: string) => {
		if (editedPatient) {
			setEditedPatient({
				...editedPatient,
				[field]: value
			});
		}

		if (!editedPatient) return;

		const updatedPatient = {
			id: editedPatient.id,
			name: editedPatient.name,
			email: editedPatient.email,
			phone: editedPatient.phone,
			dateOfBirth: editedPatient.dateOfBirth,
			bloodType: editedPatient.bloodType
		};

		//edited patient är av typen PatientDetailsVm
		//Lägg till anrop av API här sen när det finns
		try {
			await updateMutation.mutateAsync({
				id: patient.id,
				data: updatedPatient
			});
			toast.success("Patient updated successfully!");
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to update patient:", error);
			toast.error("Failed to update patient. Please try again.");
		}
	};

	return (
		<div className="w-fit">
			<Button onClick={startEdit} variant="default">
				<PenIcon className="h-4 w-4" />
				Edit Patient
			</Button>

			<DialogModal open={open} onOpenChange={setOpen} title="Edit Patient" showTrigger={false}>
				{editedPatient && (
					<>
						<DialogInput
							type="text"
							label="Name"
							value={editedPatient.name}
							onChange={value => handleEditChange("name", value)}
							required={true}
						/>

						<DialogInput
							type="email"
							label="Email"
							value={editedPatient.email}
							onChange={value => handleEditChange("email", value)}
							required={true}
						/>

						<DialogInput
							type="tel"
							label="Phone"
							value={editedPatient.phone}
							onChange={value => handleEditChange("phone", value)}
							required={true}
						/>

						<DialogInput
							type="text"
							label="Date of Birth"
							value={editedPatient.dateOfBirth}
							onChange={value => handleEditChange("dateOfBirth", value)}
							required={true}
						/>

						<DialogInput
							type="text"
							label="Blood Type"
							value={editedPatient.bloodType}
							onChange={value => handleEditChange("bloodType", value)}
							required={true}
						/>

						<div className="flex gap-2 justify-end pt-4 m-1">
							<Button onClick={() => setOpen(false)} variant="outline">
								Cancel
							</Button>
							<Button onClick={saveEdit} variant="default">
								Save Changes
							</Button>
						</div>
					</>
				)}
			</DialogModal>
		</div>
	);
};
