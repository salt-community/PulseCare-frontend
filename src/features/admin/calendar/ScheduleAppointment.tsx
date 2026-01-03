import { Plus } from "lucide-react";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import { useUser } from "@clerk/clerk-react";
import type { Patient } from "../../../lib/api/mockData";
import { Button } from "../../../components/ui/PrimaryButton";
import { mockPatients } from "../../../lib/api/mockData";
import { useCreateAppointment } from "../../appointments/hooks";
import type { AppointmentType } from "../../appointments/types";

type AppointmentProps = {
	currentDate: Date;
};

export const ScheduleAppointment = ({ currentDate }: AppointmentProps) => {
	const { user } = useUser();
	const [open, setOpen] = useState(false);
	const [patient, setPatient] = useState<Patient | null>(null);

	const createMutation = useCreateAppointment();

	const appointmentTypes: AppointmentType[] = ["Checkup", "FollowUp", "Consultation", "Lab"];
	const patients = mockPatients;

	const [date, setDate] = useState<string>(currentDate.toISOString().split("T")[0]);
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

		// TODO: Replace hardcoded IDs with actual authenticated user/patient from Clerk/DB mapping

		// Hardcoded IDs for testing. Works with local backend SeedData.

		const HARDCODED_PATIENT_ID = "8aa6b85e-52f9-40e4-b2f4-5fb767dd7e58"; // Alice Johnson from backend SeedData
		const HARDCODED_DOCTOR_ID = "8c0adcec-45f1-4723-9896-4265df0f9800"; // Dr. Michael Brown from backend SeedData

		// Alternative: Fetch doctor by Clerk email match, use selected patient from dropdown
		// const doctorResponse = await fetch(`http://localhost:5002/api/Users/by-email/${user?.emailAddresses[0]?.emailAddress}`);
		// const doctorData = await doctorResponse.json();
		// const doctorId = doctorData.id;

		// 		const [patients, setPatients] = useState([]);

		// useEffect(() => {
		//   fetch('http://localhost:5002/api/Patients')
		//     .then(res => res.json())
		//     .then(data => setPatients(data));
		// }, []);

		console.log("Using hardcoded patient ID:", HARDCODED_PATIENT_ID);
		console.log("Using hardcoded doctor ID:", HARDCODED_DOCTOR_ID);

		const appointmentDate = new Date(date);
		const newAppointment = {
			patientId: HARDCODED_PATIENT_ID,
			// patientId: patient?.id,
			doctorId: HARDCODED_DOCTOR_ID,
			// doctorId: user?.publicMetadata?.doctorId as string,
			date: appointmentDate.toISOString(),
			time: time,
			type: type,
			reason: reason || undefined
		};

		console.log("Sending appointment:", newAppointment);

		try {
			await createMutation.mutateAsync(newAppointment);
			console.log("✅ Appointment created successfully!");
			resetForm();
			setOpen(false);
		} catch (error) {
			console.error("❌ Failed to create appointment:", error);
			alert("Failed to create appointment. Check console for details.");
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
							value={patient?.id || ""}
							onChange={e => setPatient(patients.find(p => p.id === e.target.value) || null)}
							required
						>
							{patients.map(p => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
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
