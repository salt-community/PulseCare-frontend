import { useState } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";
import { PenIcon } from "lucide-react";
import type { Patient } from "../../../lib/api/mockData";

type EditPatientFormProps = {
	patient: Patient;
};

export const EditPatientForm = ({ patient }: EditPatientFormProps) => {
	const [open, setOpen] = useState(false);
	const [editedPatient, setEditedPatient] = useState<Patient | null>(null);

	const startEdit = () => {
		setEditedPatient({ ...patient });
		setOpen(true);
	};

	const saveEdit = () => {
		console.log("Save patient (mock):", editedPatient);
		setOpen(false);
	};

	const handleEditChange = (field: keyof Patient, value: string) => {
		if (editedPatient) {
			setEditedPatient({
				...editedPatient,
				[field]: value
			});
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
