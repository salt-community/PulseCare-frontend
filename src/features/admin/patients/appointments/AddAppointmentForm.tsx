import { CalendarClock, Plus } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import type { Patient } from "../../../../lib/api/mockData";
import { Button } from "../../../../components/ui/PrimaryButton";
import { toast } from "react-toastify";
import { useCreateAppointment } from "../../../../hooks/useCreateAppointment";
import type { AppointmentType, CreateAppointmentRequest } from "../../../../lib/types";

type AppointmentProps = {
	patient: Patient;
};

export const AddAppointmentForm = ({ patient }: AppointmentProps) => {
	const createMutation = useCreateAppointment(patient.id);
	const [open, setOpen] = useState(false);
	const appointmentTypes: AppointmentType[] = ["Checkup", "FollowUp", "Consultation", "Lab"];

	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [type, setType] = useState<AppointmentType>("Checkup");
	const [reason, setReason] = useState<string>("");

	const resetForm = () => {
		setDate("");
		setTime("");
		setType("Checkup");
		setReason("");
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const appointmentDate = new Date(date);
		const newAppointment: CreateAppointmentRequest = {
			patientId: patient.id,
			date: appointmentDate.toISOString(),
			time: time,
			type,
			reason: reason || undefined
		};

		try {
			await createMutation.mutateAsync(newAppointment);
			toast.success("Appointment created successfully!");
			resetForm();
			setOpen(false);
		} catch (error) {
			console.error("Failed to create appointment:", error);
			toast.error("Failed to create appointment. Please try again.");
		}
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} variant={"outline"}>
				<Plus className="w-4 h-4" /> New Appointment
			</Button>

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
							onChange={e => setType(e.target.value as AppointmentType)}
							required
						>
							{appointmentTypes.map((t, i) => (
								<option key={i} value={t}>
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

					<button
						type="submit"
						className="mt-4 w-full bg-primary text-white rounded-md py-2 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={createMutation.isPending}
					>
						{createMutation.isPending ? "Creating..." : "Add"}
					</button>
				</form>
			</DialogModal>
		</>
	);
};
