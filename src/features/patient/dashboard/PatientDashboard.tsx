import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { mockAppointments, mockHealthStats, mockMedications } from "../../../lib/api/mockData";
import { Calendar, Clock, Clock4, InfoIcon, MoveRight, PillIcon, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import PageHeader from "../../../components/shared/PageHeader";
import { Button } from "../../../components/ui/PrimaryButton";
import { Icon } from "../../../components/shared/Icon";
import { statIcons } from "../../../lib/StatsIcons";

export default function PatientDashboard() {
	const data = mockAppointments;
	const exampleUser = {
		fullName: "John Doe"
	};
	const healthData = mockHealthStats;
	const orderedHealthData = healthData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const medicationData = mockMedications;

	return (
		<>
			<PageHeader title={`Welcome back ${exampleUser.fullName}`} description="Here's an overview of your health status" />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{orderedHealthData.map(d => {
					const StatIcon = statIcons[d.type];
					return (
						<Card className="max-w-70" key={d.id}>
							<CardContent className="flex flex-row justify-between align-middle p-3 max-h-28">
								<div className="flex flex-col">
									<span className="text-sm capitalize">{d.type.replace("_", " ")}</span>
									<span>
										<span className="text-3xl font-semibold text-foreground mr-2">{d.value}</span>
										{d.unit}
									</span>
									<span className="text-xs pt-2">Last updated: {format(new Date(d.date), "MMM dd, yyyy")}</span>
								</div>
								<div className="flex flex-row display justify-end pb-4">
									<span>
										<Icon variant="red">{StatIcon && <StatIcon />} </Icon>
									</span>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="p-4 hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<PillIcon className="text-primary" />
						Medications
						<Button variant="outline" size="default" className="ml-auto">
							View all <MoveRight />
						</Button>
					</CardTitle>
					<div className="grid gap-4">
						{medicationData.map((medication, index) => (
							<Card
								key={medication.id}
								className="transition-shadow animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-5">
									<div className="flex items-start gap-4">
										<Icon variant="red">
											<PillIcon className="h-6 w-6 text-accent-foreground" />
										</Icon>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm text-foreground">{medication.name}</p>
											<p className="text-xs text-muted-foreground">
												{medication.dosage} • {medication.timesPerDay}x daily
											</p>
										</div>
										<div className="flex items-center gap-1 pt-3 text-xs text-muted-foreground">
											<Clock className="h-3.5 w-3.5" />
											<span>{medication.frequency}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Card>

				<Card className=" p-4 hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<Calendar className="text-primary" />
						Upcoming Appointments
						<Button variant="outline" size="default" className="ml-auto">
							View all <MoveRight />
						</Button>
					</CardTitle>
					<div className="flex flex-col gap-3 mt-2">
						{data.map(d => (
							<Card key={d.id} className="p-3 bg-background-secondary hover:shadow-none">
								<CardContent className="flex flex-col">
									<div className="flex flex-col gap-4 mr-2">
										<Pill variant="secondary">
											<span className="">{d.type}</span>
										</Pill>
										<div className="flex flex-col gap-4 mr-2">
											<span className="text-foreground text-sm font-semibold">
												<Stethoscope className="text-card-foreground inline size-4 mr-1.5 mb-1" />
												{d.doctorName}
											</span>
										</div>
									</div>
									<div className="border-b border-foreground/20 mt-2 pb-2 flex flex-row items-center">
										<Calendar className="inline size-4 mr-1" />
										<span className="mr-1 text-sm">{format(new Date(d.date), "dd MMM")}</span>
										<span className="mr-4 text-sm">{format(new Date(d.date), "EEEE")}</span>
										<span className="flex flex-row text-sm items-center">
											<Clock4 className="inline size-4 mx-1" />
											{d.time}
										</span>
									</div>
									<div className="flex flex-col md:flex-col gap-4 mt-2 text-xs">
										<span>{d.reason}</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Card>
			</div>
		</>
	);
}
