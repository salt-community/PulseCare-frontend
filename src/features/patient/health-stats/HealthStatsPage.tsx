import { format } from "date-fns";
import { Icon } from "../../../components/shared/Icon";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { mockHealthStats } from "../../../lib/api/mockData";
import { Pill } from "../../../components/ui/Pill";
import { statIcons } from "../../../lib/StatsIcons";
import { useEffect, useState } from "react";
import Spinner from "../../../components/shared/Spinner";

type HealthStats = {
	id: string;
	type: string;
	value: string;
	unit: string;
	date: string;
	status: string;
};

const statusVariants: Record<string, "secondary" | "destructive" | "warning"> = {
	Normal: "secondary",
	Warning: "warning",
	Critical: "destructive"
};

export default function HealthStatsPage() {
	console.log("health stats", mockHealthStats);
	const [data, setData] = useState<HealthStats[]>([]);
	const orderedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const bloodData = data.filter(d => d.type === "Cholesterol" || d.type === "Glucose");
	const testId = "1f5bebfb-cfe4-48af-aa8f-72ff49c73540";
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	async function getData() {
		try {
			const response = await fetch(baseUrl + "/HealthStats/" + testId);
			const responseData = await response.json();

			return responseData;
		} catch (err: unknown) {
			throw new Error();
		}
	}

	useEffect(() => {
		getData()
			.then(result => setData(result))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div>
			<PageHeader title="Health Statistics" description="Track your vital signs and health metrics" />

			{data.length === 0 && isLoading === false ? (
				<Card className="mb-4">
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
						<p className="text-lg font-medium text-foreground mb-2">Loading health stats... </p>
						<Spinner />
					</CardContent>
				</Card>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{orderedData.map(d => {
							const StatIcon = statIcons[d.type];
							return (
								<Card key={d.id}>
									<CardContent className="flex flex-col p-5">
										<div className="flex flex-row justify-between align-middle pb-4">
											<span>
												<Icon variant="red">{StatIcon && <StatIcon />} </Icon>
											</span>
											<span>
												<Pill variant={statusVariants[d.status]}>{d.status}</Pill>
											</span>
										</div>
										<div className="flex flex-col">
											<span className="text-sm capitalize">{d.type.replace("_", " ")}</span>
											<span>
												<span className="text-3xl font-semibold text-foreground mr-2">{d.value}</span>
												{d.unit}
											</span>
											<span className="text-xs pt-2">Last updated: {format(new Date(d.date), "MMM dd, yyyy")}</span>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					<Card className="mt-6 p-4 shadow-none hover:shadow-none">
						<CardTitle className="flex items-center gap-2 text-foreground p-3">
							<statIcons.droplets className="text-destructive-foreground" />
							Latest Blood Sample Results
						</CardTitle>
						<div className="flex flex-col gap-3 mt-2">
							{bloodData.map(d => {
								const StatIcon = statIcons[d.type];
								return (
									<Card key={d.id} className="bg-background-secondary hover:shadow-none">
										<CardContent className="flex flex-row items-center justify-between">
											<div className="flex flex-row items-center gap-4">
												<Icon variant="red">{StatIcon && <StatIcon />}</Icon>
												<div className="flex flex-col">
													<span className="font-medium capitalize text-foreground">
														{d.type.replace("_", " ")}
													</span>
													<span className="text-sm">
														Last updated: {format(new Date(d.date), "MMM dd, yyyy")}
													</span>
												</div>
											</div>
											<div className="flex flex-col items-end gap-1">
												<div>
													<span className="text-xl font-semibold text-foreground mr-2">{d.value}</span>
													<span className="text-sm">{d.unit}</span>
												</div>
												<Pill variant={statusVariants[d.status]}>{d.status}</Pill>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</Card>
				</>
			)}
		</div>
	);
}
