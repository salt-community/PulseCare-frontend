import { useState, type FormEvent } from "react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { Plus } from "lucide-react";

//TODO: hantera notes, utkommenterade är tänkt som bas när api är implementerade
type AddNotesProps = {
	appointmentId: string;
};

export const AddNotesForm = ({ appointmentId }: AddNotesProps) => {
	const [note, setNotes] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const noteRequest = {
			appointmentId,
			note
		};
		console.log(noteRequest);
		//await noteApi.addNotes(noteRequest)
		setNotes("");
		setOpen(false);
	};

	return (
		<>
			<button className="flex items-center gap-1" onClick={() => setOpen(true)}>
				Add
				<Plus className="w-4 h-4" />
			</button>
			<DialogModal title="Add note to appointment" onOpenChange={setOpen} open={open}>
				<form onSubmit={handleSubmit}>
					<DialogInput type="textarea" label="Notes" rows={3} value={note} onChange={setNotes} required={true} />

					<button type="submit" className="mt-4 w-full bg-primary text-white rounded-md py-2">
						Add
					</button>
				</form>
			</DialogModal>
		</>
	);
};
