import { CalendarClock, Plus } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import { useUser } from "@clerk/clerk-react";
import type { Patient } from "../../../../lib/api/mockData";

type AppointmentProps = {
	patient: Patient;
};

export const AddAppointmentForm = ({ patient }: AppointmentProps) => {
	const { user } = useUser();
	const [open, setOpen] = useState(false);
	const appointmentTypes = ["Checkup", "Follow-up", "Consultation", "Lab"];

	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [type, setType] = useState<string>("Checkup");
	const [reason, setReason] = useState<string>("");

	const resetForm = () => {
		setDate("");
		setTime("");
		setType("checkup");
		setReason("");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const start = `${date}T${time}:00`;
		const newAppointment = {
			patientId: patient.id,
			doctorId: user?.id,
			start,
			type,
			reason
		};

		console.log("Create appointment:", newAppointment);

		resetForm();
		setOpen(false);
	};

	return (
		<>
			<button
				className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm"
				onClick={() => setOpen(true)}
			>
				<Plus className="w-4 h-4" /> New Appointment
			</button>

			<DialogModal title="Add appointment" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 ">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
						<CalendarClock />
					</div>
					<div>
						<p className="text-sm  text-muted-foreground">Create appointment for</p>
						<p className="text-lg font-semibold text-foreground">{patient.name}</p>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="flex gap-2">
						<DialogInput type="date" label="Date" value={date} onChange={setDate} required />
						<DialogInput type="time" label="Time" value={time} onChange={setTime} required />
					</div>

					<div className="p-1 m-1">
						<label className="block p-1 text-md font-semibold">Type</label>
						<select
							className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
							value={type}
							onChange={e => setType(e.target.value)}
							required
						>
							{appointmentTypes.map(t => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					</div>

					<DialogInput
						type="textarea"
						label="Reason"
						value={reason}
						onChange={setReason}
						required={false}
						rows={3}
						placeholder="Short reason for the visit"
					/>

					<button type="submit" className="mt-4 w-full bg-primary text-white rounded-md py-2">
						Add
					</button>
				</form>
			</DialogModal>
		</>
	);
};
