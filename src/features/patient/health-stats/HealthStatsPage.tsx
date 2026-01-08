import { format } from "date-fns";
import { Icon } from "../../../components/shared/Icon";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { statIcons } from "../../../lib/StatsIcons";
import Spinner from "../../../components/shared/Spinner";
import { usePatientDashboard } from "../../../hooks/usePatientDashboard";

const statusVariants: Record<string, "secondary" | "destructive" | "warning"> = {
	Normal: "secondary",
	Warning: "warning",
	Critical: "destructive"
};

export default function HealthStatsPage() {
	const { data, isLoading, error } = usePatientDashboard();

	const healthStats = data?.healthStats ?? [];
	const orderedData = [...healthStats].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const bloodData = healthStats.filter(d => d.type === "Cholesterol" || d.type === "Glucose");
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}
	return (
		<div>
			<PageHeader title="Health Statistics" description="Track your vital signs and health metrics" />

			{error ? (
				<Card className="transition-shadow animate-slide-up hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No data could be loaded</p>
					</CardContent>
				</Card>
			) : healthStats.length === 0 ? (
				<Card className="transition-shadow animate-slide-up hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No new results</p>
					</CardContent>
				</Card>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{orderedData.map(d => {
							const StatIcon = statIcons[d.type];
							return (
								<Card key={d.id} className="shadow-none hover:shadow-none">
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
							<statIcons.droplets className="text-primary shrink-0" />
							Latest Blood Sample Results
						</CardTitle>
						<div className="flex flex-col gap-4 mt-2 px-2 pb-2">
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
