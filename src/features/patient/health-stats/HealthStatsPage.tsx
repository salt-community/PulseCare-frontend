import { format } from "date-fns";
import { Icon } from "../../../components/shared/Icon";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { mockHealthStats } from "../../../lib/api/mockData";
import { Pill } from "../../../components/ui/Pill";
import { statIcons } from "../../../lib/StatsIcons";

export default function HealthStatsPage() {
	console.log("health stats", mockHealthStats);
	const data = mockHealthStats;
	const orderedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return (
		<div>
			<PageHeader title="Health Statistics" description="Track your vital signs and health metrics" />

			{data.length === 0 ? (
				<Card className="mb-4">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2"> No new results</p>
					</CardContent>
				</Card>
			) : (
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
											<Pill variant="warning">{d.status}</Pill>
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
			)}
		</div>
	);
}
