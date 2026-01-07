import { useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { User, Calendar, Pill as LucidePill, HeartPulse, AlertTriangle, CircleAlert, SquareActivity } from "lucide-react";
import { AppointmentsTab } from "./appointments/AppointmentsTab";
import { PrescriptionsTab } from "./prescriptions/PrescriptionsTab";
import { HealthStatsTab } from "./vitals/HealthStatsTab";
import { EditPatientForm } from "./EditPatientForm";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import Spinner from "../../../components/shared/Spinner";
import type { PatientOverviewDto, PatientDetailsVm } from "../../../lib/types";
import { mockAppointments, mockHealthStats } from "../../../lib/api/mockData";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchPatientOverview = async (patientId: string, token: string): Promise<PatientOverviewDto> => {
	const res = await fetch(`${baseUrl}/patients/${patientId}/overview`, {
		headers: { Authorization: `Bearer ${token}` }
	});
	if (!res.ok) throw new Error("Failed to fetch patient overview");
	return res.json();
};

const toPatientDetailsVm = (id: string, dto: PatientOverviewDto): PatientDetailsVm => ({
	id,
	...dto,
	phone: dto.phone ?? "",
	emergencyContact: dto.emergencyContact ?? { name: "", phone: "", relationship: "" }
});

const tabs = [
	{ id: "overview", label: "Overview", icon: <User /> },
	{ id: "appointments", label: "Appointments", icon: <Calendar /> },
	{ id: "prescriptions", label: "Prescriptions", icon: <LucidePill /> },
	{ id: "vitals", label: "Vitals", icon: <SquareActivity /> }
] as const;

export function PatientDetailsPage() {
	const { patientId } = useParams({ from: "/admin/patients/$patientId" });
	const { getToken } = useAuth();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "prescriptions" | "vitals">("overview");

	const healthStats = useMemo(() => mockHealthStats, []);
	const appointments = useMemo(() => mockAppointments, []);

	const patientQuery = useQuery({
		queryKey: ["patient-overview", patientId],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return fetchPatientOverview(patientId, token);
		},
		enabled: Boolean(patientId)
	});

	const patient = patientQuery.data ? toPatientDetailsVm(patientId, patientQuery.data) : undefined;

	if (patientQuery.isLoading) {
		return (
			<Card className="max-w-md mx-auto mt-8 rounded-xl hover:shadow-none">
				<CardContent className="p-5 text-center flex flex-col items-center justify-center">
					<p className="text-foreground text-base font-medium">Loading patient...</p>
					<Spinner />
				</CardContent>
			</Card>
		);
	}

	if (patientQuery.isError || !patient) {
		return (
			<Card className="max-w-md mx-auto mt-8 rounded-xl hover:shadow-none">
				<CardContent className="p-5 text-center">
					<p className="text-destructive text-base font-medium">
						{patientQuery.isError ? "Failed to load patient" : "Patient not found"}
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<button
				onClick={() => navigate({ to: "/admin/patients" })}
				className="text-card-foreground hover:text-primary text-sm font-medium cursor-pointer"
			>
				← Back to Patients
			</button>

			<div className="flex flex-row justify-between gap-4">
				<div>
					<h1 className="text-3xl font-semibold text-foreground mb-2">{patient.name}</h1>
					<p className="text-sm text-muted-foreground">Patient since {patient.createdAt}</p>
				</div>
				<EditPatientForm patient={patient} />
			</div>

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
						<Card className="hover:shadow-none">
							<CardHeader className="p-5 pb-3">
								<CardTitle className="text-base flex items-center gap-2 text-foreground">
									<User className="h-5 w-5 text-primary" />
									Contact Info
								</CardTitle>
							</CardHeader>
							<CardContent className="p-5 pt-0 space-y-4 text-sm">
								<InfoRow label="Email" value={patient.email} />
								<InfoRow label="Phone" value={patient.phone} />
								<InfoRow label="Date of Birth" value={patient.dateOfBirth} />
							</CardContent>
						</Card>

						<Card className="hover:shadow-none">
							<CardHeader className="p-5 pb-3">
								<CardTitle className="text-base flex items-center gap-2 text-foreground">
									<HeartPulse className="h-5 w-5 text-primary" />
									Health Info
								</CardTitle>
							</CardHeader>
							<CardContent className="p-5 pt-0 space-y-4 text-sm">
								<InfoRow label="Blood Type" value={patient.bloodType} />

								<div className="border-t border-foreground/10 pt-4">
									<p className="text-foreground font-semibold mb-2 flex items-center gap-2">
										<AlertTriangle className="h-4 w-4" />
										Conditions
									</p>
									<PillList items={patient.conditions} variant="secondary" emptyText="No known conditions" />
								</div>

								<div className="border-t border-foreground/10 pt-4">
									<p className="text-foreground font-semibold mb-2 flex items-center gap-2">
										<CircleAlert className="h-4 w-4" />
										Allergies
									</p>
									<PillList items={patient.allergies} emptyText="No known allergies" />
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{activeTab === "appointments" && <AppointmentsTab appointments={appointments} patient={patient} />}

				{activeTab === "prescriptions" && <PrescriptionsTab medications={patient.medications} patient={patient} />}

				{activeTab === "vitals" && <HealthStatsTab healthStats={healthStats} patient={patient} />}
			</div>
		</div>
	);
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<div>
		<p className="text-foreground font-semibold mb-1">{label}</p>
		<p className="text-card-foreground">{value}</p>
	</div>
);

const PillList = ({ items, variant, emptyText }: { items: string[]; variant?: "secondary"; emptyText: string }) =>
	items.length === 0 ? (
		<p className="text-card-foreground">{emptyText}</p>
	) : (
		<div className="flex flex-wrap gap-2">
			{items.map(item => (
				<Pill key={item} variant={variant}>
					{item}
				</Pill>
			))}
		</div>
	);
