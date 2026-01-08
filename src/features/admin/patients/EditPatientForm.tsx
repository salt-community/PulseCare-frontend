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
	const updateMutation = useUpdatePatient(patient.id);
	const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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

	const toDateInputValue = (iso: string) => {
		if (!iso) return "";
		return new Date(iso).toISOString().split("T")[0];
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
							type="number"
							label="Phone"
							value={editedPatient.phone}
							onChange={value => handleEditChange("phone", value)}
							required={false}
						/>

						<DialogInput
							type="date"
							label="Date of Birth"
							value={toDateInputValue(editedPatient.dateOfBirth)}
							onChange={value => handleEditChange("dateOfBirth", value)}
							required={true}
						/>

						<div className="p-1 m-1">
							<label className="block p-1 text-md font-semibold">Blood Type</label>
							<select
								className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
								value={editedPatient.bloodType}
								onChange={e => handleEditChange("bloodType", e.target.value)}
								required
							>
								{bloodTypes.map((t, i) => (
									<option key={i} value={t}>
										{t}
									</option>
								))}
							</select>
						</div>

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
