import { useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mockPatients, mockAppointments, mockMedications } from "../../../lib/api/mockData";
import type { Patient, Appointment, Medication } from "../../../lib/api/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { FaUser, FaCalendarAlt, FaPills, FaHeartbeat, FaExclamationTriangle, FaCapsules, FaPlus, FaTrash } from "react-icons/fa";

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
		{ id: "overview", label: "Overview", icon: <FaUser /> },
		{ id: "appointments", label: "Appointments", icon: <FaCalendarAlt /> },
		{ id: "prescriptions", label: "Prescriptions", icon: <FaPills /> }
	] as const;

	return (
		<div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
			<button
				onClick={() => navigate({ to: "/admin/patients" })}
				className="text-card-foreground hover:underline text-lg font-semibold"
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
								className={`flex items-center gap-2 px-5 py-2 rounded-t-xl font-medium transition text-base ${
									activeTab === tab.id
										? "bg-primary-light text-foreground border-b-2 border-primary"
										: "text-card-foreground hover:text-primary hover:border-b-2 hover:border-primary-light"
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
									<FaUser /> Contact Info
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
									<FaHeartbeat /> Health Info
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-base flex flex-col justify-center">
								<p className="flex items-center gap-2">
									<strong>Blood Type:</strong> {patient.bloodType}
								</p>
								<div>
									<p className="font-medium mb-1 flex items-center gap-2">
										<FaExclamationTriangle /> Conditions:
									</p>
									<div className="flex flex-wrap gap-2">
										{patient.conditions.map(c => (
											<Badge key={c} className="bg-primary-light text-primary">
												{c}
											</Badge>
										))}
									</div>
								</div>
								<div>
									<p className="font-medium mb-1 flex items-center gap-2">
										<FaCapsules /> Allergies:
									</p>
									{patient.allergies.length === 0 ? (
										<p>No known allergies</p>
									) : (
										<div className="flex flex-wrap gap-2">
											{patient.allergies.map(a => (
												<Badge key={a} className="bg-red-100 text-red-700">
													{a}
												</Badge>
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
								<FaCalendarAlt /> Appointments
							</CardTitle>
							<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
								<FaPlus /> New Appointment
							</button>
						</CardHeader>
						<CardContent className="text-base space-y-3">
							{appointments.length === 0 ? (
								<p className="text-card-foreground">No appointments scheduled</p>
							) : (
								<ul className="space-y-4">
									{appointments.map((apt: Appointment) => (
										<li
											key={apt.id}
											className="relative flex flex-col border-b py-4 px-3 md:px-4 hover:bg-background-secondary rounded-lg transition"
										>
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-2 bg-secondary-light text-secondary-foreground font-medium px-3 py-2 rounded-lg text-lg">
													<FaCalendarAlt className="w-5 h-5" /> <span>{apt.date}</span>
												</div>
												<div className="flex items-center gap-2 text-card-foreground text-lg">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
													{apt.time}
												</div>
											</div>

											<div className="flex items-center gap-4 mt-2 ml-2">
												<Badge className="bg-primary-light text-primary">{apt.type}</Badge>
												<span className="flex items-center gap-1 text-card-foreground text-sm">
													<FaUser className="text-gray-500" /> {apt.doctorName}
												</span>
											</div>

											<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition">
												<FaTrash />
											</button>
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
				)}

				{activeTab === "prescriptions" && (
					<Card className="shadow-sm rounded-xl">
						<CardHeader className="flex justify-between items-center">
							<CardTitle className="text-xl flex items-center gap-2">
								<FaPills /> Prescriptions
							</CardTitle>
							<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
								<FaPlus /> New Prescription
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
												<FaPills className="text-primary w-5 h-5" />
												<div>
													<strong>{med.name}</strong> – {med.dosage}, {med.timesPerDay} times/day
													{med.instructions && (
														<div className="text-card-foreground text-sm">Instructions: {med.instructions}</div>
													)}
												</div>
											</div>
											<button className="mt-2 md:mt-0 text-gray-500 hover:text-gray-700 transition">
												<FaTrash />
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
