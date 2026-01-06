import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { useState, type FormEvent, useEffect } from "react";
import { Button } from "../../../components/ui/PrimaryButton";
import { useUpdateAppointment } from "../../../hooks/useAppointments";
import type { Appointment, AppointmentType, AppointmentStatus } from "../../../lib/types/appointment";

type EditAppointmentProps = {
	appointment: Appointment | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const EditAppointment = ({ appointment, open, onOpenChange }: EditAppointmentProps) => {
	const updateMutation = useUpdateAppointment();

	const appointmentTypes: AppointmentType[] = ["Checkup", "FollowUp", "Consultation", "Lab"];
	const appointmentStatuses: AppointmentStatus[] = ["Scheduled", "Completed", "Cancelled"];

	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [type, setType] = useState<AppointmentType>("Checkup");
	const [status, setStatus] = useState<AppointmentStatus>("Scheduled");
	const [reason, setReason] = useState<string>("");

	// Populate form when appointment changes
	useEffect(() => {
		if (appointment) {
			setDate(appointment.date.split("T")[0]);
			setTime(appointment.time);
			setType(appointment.type);
			setStatus(appointment.status);
			setReason(appointment.reason || "");
		}
	}, [appointment]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!appointment) return;

		// Map string enums to numbers for backend
		const typeMap: Record<AppointmentType, number> = {
			Checkup: 0,
			FollowUp: 1,
			Consultation: 2,
			Lab: 3
		};

		const statusMap: Record<AppointmentStatus, number> = {
			Scheduled: 0,
			Completed: 1,
			Cancelled: 2
		};

		const appointmentDate = new Date(date);
		const timeWithSeconds = time.length === 5 ? `${time}:00` : time;

		const updatedAppointment = {
			date: appointmentDate.toISOString(),
			time: timeWithSeconds,
			type: typeMap[type],
			status: statusMap[status],
			reason: reason || undefined
		};

		try {
			await updateMutation.mutateAsync({
				id: appointment.id,
				data: updatedAppointment
			});
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to update appointment:", error);
			alert("Failed to update appointment. Please try again.");
		}
	};

	return (
		<DialogModal
			title={`Edit Appointment - ${appointment?.patientName || "Unknown Patient"}`}
			description={appointment?.reason || undefined}
			onOpenChange={onOpenChange}
			open={open}
			showTrigger={false}
		>
			<form onSubmit={handleSubmit} className="mt-4">
				<div className="p-1 m-1">
					<label className="block p-1 text-md font-semibold text-foreground">Patient</label>
					<input
						type="text"
						className="bg-muted border border-foreground/20 rounded-md p-2 w-full cursor-not-allowed"
						value={appointment?.patientName || "Unknown Patient"}
						disabled
						readOnly
					/>
				</div>

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
						{appointmentTypes.map(t => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="p-1 m-1">
					<label className="block p-1 text-md font-semibold">Status</label>
					<select
						className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
						value={status}
						onChange={e => setStatus(e.target.value as AppointmentStatus)}
						required
					>
						{appointmentStatuses.map(s => (
							<option key={s} value={s}>
								{s}
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

				<Button type="submit" className="mt-4 w-full" disabled={updateMutation.isPending}>
					{updateMutation.isPending ? "Updating..." : "Update"}
				</Button>
			</form>
		</DialogModal>
	);
};
