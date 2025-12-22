import { useState, type FormEvent } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";

//TODO: hantera notes, utkommenterade är tänkt som bas när api är implementerade
// type AddNotesProps = {
// 	appointmentId: string;
// };

// export const AddNotesForm = ({ appointmentId }: AddNotesProps) => {
export const AddNotesForm = () => {
	const [note, setNotes] = useState("");

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
	};

	return (
		<DialogModal title="Add Notes" buttonText="Add Notes">
			<form onSubmit={handleSubmit}>
				<DialogInput type="textarea" label="Notes" rows={3} value={note} onChange={setNotes} />

				<button type="submit" className="mt-4 w-full bg-primary text-white rounded-md py-2">
					Save
				</button>
			</form>
		</DialogModal>
	);
};
