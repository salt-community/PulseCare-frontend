import { Plus } from "lucide-react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import { Button } from "../../../components/ui/PrimaryButton";
import { useCreateAppointment, useAllAppointments } from "../../../hooks/useAppointments"; // add use all
import { usePatients } from "../../../hooks/usePatients";
import type { AppointmentType } from "../../../lib/types/appointment";
import { toast } from "react-toastify";

type AppointmentProps = {
	currentDate: Date;
};

export const ScheduleAppointment = ({ currentDate }: AppointmentProps) => {
	const [open, setOpen] = useState(false);
	const [selectedPatientId, setSelectedPatientId] = useState<string>("");

	const createMutation = useCreateAppointment();
	const { data: patients, isLoading: isPatientsLoading } = usePatients();
	const { data: appointments = [] } = useAllAppointments(); //added

	const appointmentTypes: AppointmentType[] = ["Checkup", "FollowUp", "Consultation", "Lab"];

	const [date, setDate] = useState<string>(currentDate.toISOString().split("T")[0]);
	const [time, setTime] = useState<string>("");
	const [type, setType] = useState<AppointmentType>("Checkup");
	const [reason, setReason] = useState<string>("");
	const [conflictError, setConflictError] = useState<string>("");

	const resetForm = () => {
		setSelectedPatientId("");
		setDate("");
		setTime("");
		setType("Checkup");
		setReason("");
		setConflictError("");
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!selectedPatientId) {
			toast.error("Please select a patient");
			return;
		}

		const appointmentDate = new Date(date);
		const newAppointment = {
			patientId: selectedPatientId,
			date: appointmentDate.toISOString(),
			time: time,
			type: type,
			reason: reason || undefined
		};

		const conflict = appointments.find(a => a.date.startsWith(date) && (a.time ?? "") === time);
		if (conflict) {
			setConflictError("There is already an appointment at this time.");
			return;
		}

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
			<Button className="mb-4" onClick={() => setOpen(true)}>
				<Plus className="w-4 h-4" /> New Appointment
			</Button>

			<DialogModal title="Add appointment" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 "></div>

				<form onSubmit={handleSubmit}>
					<div className="p-1 m-1">
						<label className="block p-1 text-md font-semibold">Patient</label>
						<select
							className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
							value={selectedPatientId}
							onChange={e => setSelectedPatientId(e.target.value)}
							required
							disabled={isPatientsLoading}
						>
							<option value="">{isPatientsLoading ? "Loading patients..." : "Select a patient"}</option>
							{patients?.map(p => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex gap-2">
						<DialogInput
							type="date"
							label="Date"
							value={date}
							onChange={v => {
								setDate(v);
								setConflictError("");
							}}
							required
						/>
						<DialogInput
							type="time"
							label="Time"
							value={time}
							onChange={v => {
								setTime(v);
								setConflictError("");
							}}
							required
						/>
					</div>

					{conflictError && (
						<div className="flex gap-2">
							<div className="w-1/2" />
							<p className="text-red-500 text-sm mt-2">{conflictError}</p>
						</div>
					)}

					<div className="p-1 m-1">
						<label className="block p-1 text-md font-semibold">Type</label>
						<select
							className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
							value={type}
							onChange={e => setType(e.target.value as AppointmentType)}
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
						label="Notes"
						value={reason}
						onChange={setReason}
						required={false}
						rows={3}
						placeholder="Short reason for the visit"
					/>

					<button
						type="submit"
						className="mt-4 w-full bg-primary text-white rounded-md py-2 cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={createMutation.isPending}
					>
						{createMutation.isPending ? "Creating..." : "Add"}
					</button>
				</form>
			</DialogModal>
		</>
	);
};
