import { useState, type FormEvent } from "react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { Plus } from "lucide-react";
import { Button } from "../../../../components/ui/PrimaryButton";
import { useAddPatientNote } from "../../../../hooks/useAddPatientNote ";

type AddNotesProps = {
	appointmentId: string;
	patientId: string;
};

export const AddNotesForm = ({ appointmentId, patientId }: AddNotesProps) => {
	const [title, setTitle] = useState("");
	const [diagnosis, setDiagnosis] = useState("");
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);
	const addNoteMutation = useAddPatientNote(patientId);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const noteRequest = {
			appointmentId,
			patientId,
			title,
			diagnosis,
			content
		};
		addNoteMutation.mutate(noteRequest);
		setContent("");
		setDiagnosis("");
		setTitle("");
		setOpen(false);
	};

	return (
		<>
			<Button variant="outline" size="sm" onClick={() => setOpen(true)}>
				Add
				<Plus className="w-4 h-4" />
			</Button>
			<DialogModal title="Add note to appointment" onOpenChange={setOpen} open={open}>
				<form onSubmit={handleSubmit}>
					<DialogInput type="input" label="Title" value={title} onChange={setTitle} required={true} />
					<DialogInput type="textarea" label="Diagnosis" rows={3} value={diagnosis} onChange={setDiagnosis} required={true} />
					<DialogInput type="textarea" label="Notes" rows={3} value={content} onChange={setContent} required={true} />

					<button type="submit" className="mt-4 w-full bg-primary text-white rounded-md py-2">
						Add
					</button>
				</form>
			</DialogModal>
		</>
	);
};
