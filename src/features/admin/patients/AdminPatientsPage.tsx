import PageHeader from "../../../components/shared/PageHeader";
import { useState } from "react";
import { PatientInfoCard } from "../../../components/ui/PatientInfoCard";
import { SearchBar } from "../../../components/ui/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import Spinner from "../../../components/shared/Spinner";
import type { PatientDto, PatientCardVm } from "../../../lib/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchPatients = async (token: string): Promise<PatientDto[]> => {
	const res = await fetch(`${baseUrl}/patients`, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (!res.ok) throw new Error(`Failed to fetch patients: ${res.status}`);
	return res.json();
};

export const AdminPatientsPage = () => {
	const { getToken } = useAuth();
	const [search, setSearch] = useState("");

	const patientsQuery = useQuery({
		queryKey: ["patients"],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return fetchPatients(token);
		}
	});

	const searchLower = search.toLowerCase();
	const filteredPatients: PatientCardVm[] = (patientsQuery.data ?? [])
		.filter(p => p.name?.toLowerCase().includes(searchLower) || p.email?.toLowerCase().includes(searchLower))
		.map(p => ({
			id: p.id,
			name: p.name ?? "",
			email: p.email ?? "",
			phone: p.phone ?? "",
			conditions: p.conditions ?? []
		}));
	if (patientsQuery.isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}
	if (patientsQuery.isError) {
		return <div>Failed to load patients...</div>;
	}
	return (
		<>
			<PageHeader title="Patients" description="View and manage all patient records" />
			<SearchBar value={search} onChange={setSearch} />

			{filteredPatients.length === 0 ? (
				<p className="mt-10 text-center text-muted-foreground">No patients found</p>
			) : (
				<div className="mt-6 space-y-4">
					{filteredPatients.map(p => (
						<PatientInfoCard key={p.id} patient={p} />
					))}
				</div>
			)}
		</>
	);
};
