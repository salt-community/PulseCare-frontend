import PageHeader from "../../../components/shared/PageHeader";
import { mockPatients } from "../../../lib/api/mockData";
import { useState } from "react";
import { PatientInfoCard } from "../../../components/ui/PatientInfoCard";
import { SearchBar } from "../../../components/ui/SearchBar";

export const AdminPatientsPage = () => {
	const [search, setSearch] = useState("");

	const filteredPatients = mockPatients.filter(
		patient => patient.name.toLowerCase().includes(search.toLowerCase()) || patient.email.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<PageHeader title="Patients" description="View and manage all patient records" />
			<SearchBar value={search} onChange={setSearch} />

			<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredPatients.map(patient => (
					<PatientInfoCard key={patient.id} patient={patient} />
				))}
			</div>
		</>
	);
};
