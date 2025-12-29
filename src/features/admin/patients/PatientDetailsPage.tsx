import { useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mockPatients, mockAppointments, mockMedications } from "../../../lib/api/mockData";
import type { Patient } from "../../../lib/api/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { User, Calendar, Pill as LucidePill, HeartPulse, AlertTriangle, CircleAlert } from "lucide-react";
import { AppointmentsTab } from "./appointments/AppointmentsTab";
import { PrescriptionsTab } from "./prescriptions/PrescriptionsTab";

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
						<Card className="shadow-sm rounded-xl flex-1 flex flex-col">
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

				{activeTab === "appointments" && <AppointmentsTab appointments={appointments} patient={patient} />}

				{activeTab === "prescriptions" && <PrescriptionsTab medications={medications} patient={patient} />}
			</div>
		</div>
	);
}
