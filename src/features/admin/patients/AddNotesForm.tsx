import { useState, type FormEvent } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Plus } from "lucide-react";

//TODO: hantera notes, utkommenterade är tänkt som bas när api är implementerade
// type AddNotesProps = {
// 	appointmentId: string;
// };

// export const AddNotesForm = ({ appointmentId }: AddNotesProps) => {
export const AddNotesForm = () => {
	const [note, setNotes] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!note.trim()) {
			//error hantering när inputen är tom, kanske i själva modalen eller input
			return;
		}
		console.log(note);
		// const noteRequest = {
		// 	appointmentId,
		// 	note
		// };
		//await noteApi.addNotes(noteRequest)
		setNotes("");
		setOpen(false);
	};

	return (
		<>
			<button
				className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm"
				onClick={() => setOpen(true)}
			>
				<Plus className="w-4 h-4" /> Add Note
			</button>
			<DialogModal title="Add Notes" onOpenChange={setOpen} open={open}>
				<form onSubmit={handleSubmit}>
					<DialogInput type="textarea" label="Notes" rows={3} value={note} onChange={setNotes} />

					<button type="submit" className="mt-4 w-full bg-primary text-white rounded-md py-2">
						Save
					</button>
				</form>
			</DialogModal>
		</>
	);
};
