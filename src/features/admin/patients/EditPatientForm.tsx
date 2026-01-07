import { useState } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";
import { PenIcon } from "lucide-react";
import type { PatientDetailsVm } from "../../../lib/types/patient";
import { toast } from "react-toastify";
import { useUpdatePatient } from "../../../hooks/usePatients";

type EditPatientFormProps = {
	patient: PatientDetailsVm;
};

export const EditPatientForm = ({ patient }: EditPatientFormProps) => {
	const [open, setOpen] = useState(false);
	const [editedPatient, setEditedPatient] = useState<PatientDetailsVm>({ ...patient });
	const updateMutation = useUpdatePatient();

	const startEdit = () => {
		setEditedPatient({ ...patient });
		setOpen(true);
	};

	const handleEditChange = (field: keyof PatientDetailsVm, value: string) => {
		setEditedPatient({
			...editedPatient,
			[field]: value
		});
	};

	const saveEdit = async () => {
		const updatedPatient = {
			id: editedPatient.id,
			name: editedPatient.name,
			email: editedPatient.email,
			phone: editedPatient.phone,
			dateOfBirth: editedPatient.dateOfBirth,
			bloodType: editedPatient.bloodType
		};

		try {
			await updateMutation.mutateAsync({
				patient: updatedPatient
			});
			toast.success("Patient updated successfully!");
			setOpen(false);
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
