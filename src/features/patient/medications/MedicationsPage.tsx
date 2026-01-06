import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Calendar, Pill as PillIcon, InfoIcon, Clock } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Icon } from "../../../components/shared/Icon";
import Spinner from "../../../components/shared/Spinner";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { type Medication } from "../../../lib/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchMedications = async (token: string): Promise<Medication[]> => {
	const res = await fetch(`${baseUrl}/Medications/me`, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch medications: ${res.status}`);
	}

	return res.json();
};

export default function MedicationsPage() {
	const { getToken } = useAuth();

	const medicationsQuery = useQuery({
		queryKey: ["medications"],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) {
				throw new Error("No auth token available");
			}
			return fetchMedications(token);
		}
	});

	const medications = medicationsQuery.data ?? [];

	return (
		<>
			<PageHeader title={"Medications"} description="Your current prescriptions and medication schedule" />
			{medicationsQuery.isLoading ? (
				<Card className="flex flex-col items-center">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">Loading medications... </p>
						<Spinner />
					</CardContent>
				</Card>
			) : medicationsQuery.isError ? (
				<Card className="transition-shadow animate-slide-up hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No data could be loaded</p>
					</CardContent>
				</Card>
			) : medications.length === 0 ? (
				<Card className="transition-shadow animate-slide-up hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No new results</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{medications.map((medication, index) => (
						<Card
							key={medication.id}
							className="transition-shadow animate-slide-up hover:shadow-none"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<CardContent className="p-5">
								<div className="flex items-start gap-4">
									<Icon variant="red">
										<PillIcon className="h-6 w-6 text-accent-foreground" />
									</Icon>

									<div className="flex-1">
										<div className="flex items-start justify-between gap-2 mb-2">
											<h3 className="font-semibold text-lg text-foreground">{medication.name}</h3>
											<Pill>{medication.dosage}</Pill>
										</div>

										<div className="space-y-2 text-sm">
											<div className="flex items-center gap-2 text-muted-foreground">
												<Clock className="h-4 w-4" />
												<span>
													{medication.timesPerDay}x daily ({medication.frequency})
												</span>
											</div>
											<div className="flex items-center gap-2 text-muted-foreground">
												<Calendar className="h-4 w-4" />
												<span>Started {medication.startDate}</span>
											</div>
											{medication.instructions && (
												<div className="flex items-start gap-2 text-muted-foreground mt-3 pt-3 border-t border-border">
													<InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
													<span>{medication.instructions}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</>
	);
}
