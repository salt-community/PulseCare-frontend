import { useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mockPatients, mockAppointments, mockMedications } from "../../../lib/api/mockData";
import type { Patient, Appointment, Medication } from "../../../lib/api/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import {
	User,
	Calendar,
	Pill as LucidePill,
	HeartPulse,
	AlertTriangle,
	CircleAlert,
	Plus,
	Trash,
	Stethoscope,
	CalendarOff,
	Clock4
} from "lucide-react";
import { AddNotesForm } from "./AddNotesForm";

export function PatientDetailsPage() {
	const { patientId } = useParams({ from: "/admin/patients/$patientId" });
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
	const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "prescriptions">("overview");

	const patient = useMemo(() => mockPatients.find(p => p.id === patientId), [patientId]);
	const appointments = useMemo(() => mockAppointments.filter(a => a.patientId === patientId), [patientId]);
	const medications = useMemo(() => mockMedications, []);

	if (!patient) {
		return (
			<Card className="max-w-md mx-auto mt-8 rounded-xl shadow-md">
				<CardContent className="text-center">
					<p className="text-foreground text-base font-medium">Patient not found</p>
					<button
						className="mt-4 px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-base"
						onClick={() => navigate({ to: "/admin/patients" })}
					>
						Back
					</button>
				</CardContent>
			</Card>
		);
	}

	const startEdit = () => {
		setEditedPatient({ ...patient });
		setIsEditing(true);
	};

	const saveEdit = () => {
		console.log("Save patient (mock):", editedPatient);
		setIsEditing(false);
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: <User /> },
		{ id: "appointments", label: "Appointments", icon: <Calendar /> },
		{ id: "prescriptions", label: "Prescriptions", icon: <LucidePill /> }
	] as const;

	return (
		<div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
			<button
				onClick={() => navigate({ to: "/admin/patients" })}
				className="text-card-foreground hover:underline hover:text-primary text-lg font-semibold"
			>
				← Back
			</button>

			<Card className="shadow-md rounded-xl">
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
					<CardTitle className="text-2xl md:text-3xl text-foreground font-semibold">{patient.name}</CardTitle>
					<div className="flex gap-3 mt-2 md:mt-0">
						{!isEditing ? (
							<button
								onClick={startEdit}
								className="px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-base"
							>
								Edit
							</button>
						) : (
							<>
								<button
									onClick={() => setIsEditing(false)}
									className="px-5 py-2 bg-background-secondary text-foreground rounded-xl hover:bg-background transition text-base"
								>
									Cancel
								</button>
								<button
									onClick={saveEdit}
									className="px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-base"
								>
									Save
								</button>
							</>
						)}
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-card-foreground text-sm">Patient since {patient.createdAt}</p>
				</CardContent>
			</Card>

			<div className="border-b border-border">
				<ul className="flex flex-wrap -mb-px">
					{tabs.map(tab => (
						<li key={tab.id} className="mr-2">
							<button
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-5 py-2 rounded-t-xl font-medium transition text-base cursor-pointer ${
									activeTab === tab.id
										? "bg-primary-light text-foreground border-b-2 border-primary"
										: "text-card-foreground hover:text-primary hover:border-b-2 hover:border-primary-light transition-all ease-in-out duration-200"
								}`}
							>
								{tab.icon}
								{tab.label}
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-6">
				{activeTab === "overview" && (
					<div className="flex flex-col md:flex-row gap-6">
						<Card className="shadow-sm rounded-xl flex-1 flex flex-col justify-center">
							<CardHeader>
								<CardTitle className="text-lg md:text-xl flex items-center gap-2">
									<User className="text-primary" /> Contact Info
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 text-base flex flex-col justify-center">
								<p>
									<strong>Email:</strong> <span>{patient.email}</span>
								</p>
								<p>
									<strong>Phone:</strong> <span>{patient.phone}</span>
								</p>
								<p>
									<strong>Date of Birth:</strong> <span>{patient.dateOfBirth}</span>
								</p>
							</CardContent>
						</Card>

						<Card className="shadow-sm rounded-xl flex-1 flex flex-col justify-center">
							<CardHeader>
								<CardTitle className="text-lg md:text-xl flex items-center gap-2">
									<HeartPulse className="text-primary" /> Health Info
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-base flex flex-col justify-center">
								<p className="flex items-center gap-2">
									<strong>Blood Type:</strong> {patient.bloodType}
								</p>
								<div>
									<p className="font-medium mb-1 flex items-center gap-2">
										<AlertTriangle /> Conditions:
									</p>
									<div className="flex flex-wrap gap-2">
										{patient.conditions.map(c => (
											<Pill key={c} variant="secondary" className="text-sm md:text-base hover:bg-secondary/80">
												{c}
											</Pill>
										))}
									</div>
								</div>
								<div>
									<p className="font-medium mb-1 flex items-center gap-2">
										<CircleAlert /> Allergies:
									</p>
									{patient.allergies.length === 0 ? (
										<p>No known allergies</p>
									) : (
										<div className="flex flex-wrap gap-2">
											{patient.allergies.map(a => (
												<Pill key={a} className="bg-red-100 text-red-400 hover:bg-red-200 text-sm md:text-base">
													{a}
												</Pill>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{activeTab === "appointments" && (
					<Card className="shadow-sm rounded-xl">
						<CardHeader className="flex justify-between items-center">
							<CardTitle className="text-xl flex items-center gap-2">
								<Calendar className="w-5 h-5" /> Appointments
							</CardTitle>
							<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
								<Plus className="w-4 h-4" /> New Appointment
							</button>
						</CardHeader>
						<CardContent className="space-y-4">
							{appointments.length === 0 ? (
								<p className="text-center text-muted-foreground">No appointments scheduled</p>
							) : (
								<div className="flex flex-col gap-3 mt-2">
									{appointments.map((apt: Appointment) => (
										<Card key={apt.id} className="relative flex flex-row p-3 align-middle shadow-md rounded-xl">
											<CalendarOff className="absolute size-8 top-3 right-3 z-10 hover:bg-destructive-dark/70 rounded-sm p-1" />

											<CardContent className="flex flex-col gap-3 p-2 md:flex-row md:items-center md:justify-between lg:p-6">
												<div className="flex gap-4 items-center">
													<div className="flex flex-col bg-(image:--gradient-primary) text-white py-3 p-6 rounded-md">
														<span className="text-2xl font-bold">{format(new Date(apt.date), "dd")}</span>
														<span className="text-sm">{format(new Date(apt.date), "MMM")}</span>
													</div>
													<div className="flex flex-col pt-2">
														<span className="font-semibold text-foreground">
															{format(new Date(apt.date), "EEEE")}
														</span>
														<span className="text-sm text-muted-foreground">
															<Clock4 className="inline size-4 mr-1 mb-1" />
															{apt.time}
														</span>
													</div>
												</div>

												<div>
													<div className="flex flex-row gap-2">
														<Pill variant="secondary" className="text-sm">
															<span>{apt.type}</span>
														</Pill>
														<Pill variant="default" className="text-sm">
															<span>{apt.status}</span>
														</Pill>
													</div>
													<div className="flex flex-col md:flex-col gap-4 m-2">
														<span className="font-bold text-lg text-foreground">
															<Stethoscope className="inline size-4 mr-1.5 mb-1" />
															{apt.doctorName}
														</span>
														<span className="text-sm text-muted-foreground">{apt.notes}</span>
													</div>
												</div>
												<AddNotesForm appointmentId={apt.id} />
											</CardContent>
										</Card>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{activeTab === "prescriptions" && (
					<Card className="shadow-sm rounded-xl">
						<CardHeader className="flex justify-between items-center">
							<CardTitle className="text-xl flex items-center gap-2">
								<LucidePill /> Prescriptions
							</CardTitle>
							<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
								<Plus /> New Prescription
							</button>
						</CardHeader>
						<CardContent className="text-base">
							{medications.length === 0 ? (
								<p>No medications</p>
							) : (
								<ul className="space-y-2">
									{medications.map((med: Medication) => (
										<li
											key={med.id}
											className="flex flex-col md:flex-row md:justify-between md:items-center border-b py-2"
										>
											<div className="flex items-center gap-2">
												<LucidePill className="text-primary w-5 h-5" />
												<div>
													<strong>{med.name}</strong> – {med.dosage}, {med.timesPerDay} times/day
													{med.instructions && (
														<div className="text-card-foreground text-sm">Instructions: {med.instructions}</div>
													)}
												</div>
											</div>
											<button className="mt-2 md:mt-0 text-gray-500 hover:text-gray-700 transition">
												<Trash />
											</button>
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
