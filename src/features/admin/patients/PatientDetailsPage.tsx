import { useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mockPatients, mockAppointments, mockMedications } from "../../../lib/api/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { User, Calendar, Pill as LucidePill, HeartPulse, AlertTriangle, CircleAlert } from "lucide-react";
import { AppointmentsTab } from "./appointments/AppointmentsTab";
import { PrescriptionsTab } from "./prescriptions/PrescriptionsTab";
import { EditPatientForm } from "./EditPatientForm";

export function PatientDetailsPage() {
	const { patientId } = useParams({ from: "/admin/patients/$patientId" });
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "prescriptions">("overview");
	const patient = useMemo(() => mockPatients.find(p => p.id === patientId), [patientId]);
	const appointments = useMemo(() => mockAppointments.filter(a => a.patientId === patientId), [patientId]);
	const medications = useMemo(() => mockMedications, []);

	if (!patient) {
		return (
			<Card className="max-w-md mx-auto mt-8 rounded-xl hover:shadow-none">
				<CardContent className="p-5 text-center">
					<p className="text-foreground text-base font-medium">Patient not found</p>
				</CardContent>
			</Card>
		);
	}

	const tabs = [
		{ id: "overview", label: "Overview", icon: <User /> },
		{ id: "appointments", label: "Appointments", icon: <Calendar /> },
		{ id: "prescriptions", label: "Prescriptions", icon: <LucidePill /> }
	] as const;

	return (
		<div className="space-y-6">
			<button
				onClick={() => navigate({ to: "/admin/patients" })}
				className="text-card-foreground hover:text-primary text-sm font-medium cursor-pointer"
			>
				← Back to Patients
			</button>

			{/* Header Section */}
			<div className="flex flex-row justify-between  gap-4">
				<div>
					<h1 className="text-3xl font-semibold text-foreground mb-2">{patient.name}</h1>
					<p className="text-sm text-muted-foreground">Patient since {patient.createdAt}</p>
				</div>
				<EditPatientForm patient={patient} />
			</div>

			{/* Tabs */}
			<div className="border-b border-foreground/10">
				<ul className="flex max-[500px]:justify-evenly gap-2 -mb-px">
					{tabs.map(tab => (
						<li key={tab.id}>
							<button
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-4 py-3 font-medium transition text-sm cursor-pointer ${
									activeTab === tab.id
										? "text-primary border-b-2 border-primary"
										: "text-card-foreground hover:text-primary"
								}`}
							>
								{tab.icon}
								<span className="hidden min-[500px]:inline">{tab.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-6">
				{activeTab === "overview" && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Contact Info Card */}
						<Card className="hover:shadow-none">
							<CardHeader className="p-5 pb-3">
								<CardTitle className="text-base flex items-center gap-2 text-foreground">
									<User className="h-5 w-5 text-primary" />
									Contact Info
								</CardTitle>
							</CardHeader>
							<CardContent className="p-5 pt-0 space-y-4 text-sm">
								<div>
									<p className="text-foreground font-semibold mb-1">Email</p>
									<p className="text-card-foreground">{patient.email}</p>
								</div>
								<div>
									<p className="text-foreground font-semibold mb-1">Phone</p>
									<p className="text-card-foreground">{patient.phone}</p>
								</div>
								<div>
									<p className="text-foreground font-semibold mb-1">Date of Birth</p>
									<p className="text-card-foreground">{patient.dateOfBirth}</p>
								</div>
							</CardContent>
						</Card>

						{/* Health Info Card */}
						<Card className="hover:shadow-none">
							<CardHeader className="p-5 pb-3">
								<CardTitle className="text-base flex items-center gap-2 text-foreground">
									<HeartPulse className="h-5 w-5 text-primary" />
									Health Info
								</CardTitle>
							</CardHeader>
							<CardContent className="p-5 pt-0 space-y-4 text-sm">
								<div>
									<p className="text-foreground font-semibold mb-2">Blood Type</p>
									<p className="text-card-foreground font-medium">{patient.bloodType}</p>
								</div>

								<div className="border-t border-foreground/10 pt-4">
									<p className="text-foreground font-semibold mb-2 flex items-center gap-2">
										<AlertTriangle className="h-4 w-4" />
										Conditions
									</p>
									<div className="flex flex-wrap gap-2">
										{patient.conditions.map(c => (
											<Pill key={c} variant="secondary">
												{c}
											</Pill>
										))}
									</div>
								</div>

								<div className="border-t border-foreground/10 pt-4">
									<p className="text-foreground font-semibold mb-2 flex items-center gap-2">
										<CircleAlert className="h-4 w-4" />
										Allergies
									</p>
									{patient.allergies.length === 0 ? (
										<p className="text-card-foreground">No known allergies</p>
									) : (
										<div className="flex flex-wrap gap-2">
											{patient.allergies.map(a => (
												<Pill key={a}>{a}</Pill>
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
