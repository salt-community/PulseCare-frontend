import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Calendar, Pill as PillIcon, InfoIcon, Clock } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Icon } from "../../../components/shared/Icon";
import { useEffect, useState } from "react";
import Spinner from "../../../components/shared/Spinner";
import { useAuth } from "@clerk/clerk-react";

type Medications = {
	id: string;
	name: string;
	dosage: string;
	timesPerDay: number;
	frequency: string;
	startDate: string;
	instructions: string;
};

export default function MedicationsPage() {
	const { getToken, isLoaded } = useAuth();

	const [data, setData] = useState<Medications[]>([]);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const testId = "98decd37-0a1f-4af4-a73f-02510e737c21"; // For testing

	async function getData() {
		if (!isLoaded) return;

		const token = await getToken({ template: "pulsecare-jwt-template" });

		if (!token) {
			throw new Error("No auth token available");
		}

		const response = await fetch(`${baseUrl}/Medications/${testId}`, {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			throw new Error("Request failed");
		}

		return response.json();
	}

	useEffect(() => {
		getData()
			.then(result => setData(result))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			<PageHeader title={"Medications"} description="Your current prescriptions and medication schedule" />
			{data.length === 0 && isLoading === false ? (
				<Card className="transition-shadow animate-slide-up hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						{isError ? (
							<p className="text-lg font-medium text-foreground mb-2">No data could be loaded</p>
						) : (
							<p className="text-lg font-medium text-foreground mb-2"> No new results</p>
						)}
					</CardContent>
				</Card>
			) : isLoading ? (
				<Card className="flex flex-col items-center">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">Loading medications... </p>
						<Spinner />
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{data.map((medication, index) => (
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
