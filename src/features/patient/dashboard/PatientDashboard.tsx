import { usePatientDashboard } from "../../../hooks/usePatientDashboard";
import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { Calendar, Clock, Clock4, MoveRight, PillIcon, Stethoscope, StickyNote } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import PageHeader from "../../../components/shared/PageHeader";
import { Button } from "../../../components/ui/PrimaryButton";
import { Icon } from "../../../components/shared/Icon";
import { statIcons } from "../../../lib/StatsIcons";
import { Link } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "../../../components/shared/Spinner";

export default function PatientDashboard() {
	const { isSignedIn } = useUser();
	const { data, isLoading, error } = usePatientDashboard();

	useEffect(() => {
		if (error) {
			toast.error("Something went wrong while loading your dashboard.");
		}
	}, [error]);

	if (!isSignedIn) return null;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}

	if (!data) return null;

	const exampleUser = {
		fullName: data?.patient.name ?? "Patient"
	};

	const healthData = data?.healthStats ?? [];
	const orderedHealthData = [...healthData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const medicationData = data?.medications ?? [];
	const notesData = data?.notes ?? [];
	const appointmentsData = data?.appointments ?? [];

	return (
		<>
			<PageHeader title={`Welcome back ${exampleUser.fullName}`} description="Here's an overview of your health status" />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 justify-items-stretch">
				{orderedHealthData.map(d => {
					const StatIcon = statIcons[d.type];
					return (
						<Card className="hover:shadow-none" key={d.id}>
							<CardContent className="flex flex-row justify-between align-middle p-5 max-h-28">
								<div className="flex flex-col">
									<span className="text-sm capitalize">{d.type.replace("_", " ")}</span>
									<span>
										<span className="text-3xl font-semibold text-foreground mr-2">{d.value}</span>
										{d.unit}
									</span>
									<span className="text-xs pt-2 whitespace-nowrap">
										Last updated: {format(new Date(d.date), "MMM dd, yyyy")}
									</span>
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

			<div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
				<Card className="p-4 hover:shadow-none lg:row-span-1">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<PillIcon className="text-primary shrink-0" size={20} />
						Medications
						<Button asChild variant="outline" size="default" className="ml-auto">
							<Link to="/patient/medications">
								View all <MoveRight />
							</Link>
						</Button>
					</CardTitle>
					<div className="grid gap-4 px-2 pb-2">
						{medicationData.map((medication, index) => (
							<Card
								key={medication.id ?? index}
								className="transition-shadow animate-slide-up hover:shadow-none bg-background-secondary"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-5">
									<div className="flex items-start gap-4">
										<Icon variant="red">
											<PillIcon className="h-6 w-6 text-accent-foreground" />
										</Icon>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm text-foreground">{medication.name}</p>
											<div className="flex gap-2">
												<Clock className="h-3.5 w-3.5" />
												<p className="text-xs text-muted-foreground">
													{medication.timesPerDay} x {medication.frequency}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-1 pt-3 text-xs text-muted-foreground">
											<Pill>
												<span>{medication.dosage} </span>
											</Pill>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Card>

				<Card className="p-4 hover:shadow-none lg:row-span-2">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<Calendar className="text-primary shrink-0" size={20} />
						Upcoming Appointments
						<Button asChild variant="outline" size="default" className="ml-auto">
							<Link to="/patient/appointments">
								View all <MoveRight />
							</Link>
						</Button>
					</CardTitle>
					<div className="flex flex-col gap-4 mt-2 px-2 pb-2">
						{appointmentsData.map(d => (
							<Card key={d.id} className="bg-background-secondary hover:shadow-none">
								<CardContent className="p-5 flex flex-col">
									<div className="flex justify-between mr-2">
										<div className="flex flex-col gap-4 mr-2">
											<span className="text-foreground text-sm font-semibold">
												<Stethoscope className="text-card-foreground inline size-4 mr-1.5 mb-1" />
												{d.doctorName}
											</span>
										</div>
										<Pill variant="secondary">
											<span>{d.type}</span>
										</Pill>
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

				<Card className="p-4 hover:shadow-none lg:row-span-1">
					<CardTitle className="flex items-center gap-2 text-foreground p-3 ">
						<StickyNote className="text-primary shrink-0" size={20} />
						Appointment Notes
						<Button asChild variant="outline" size="default" className="ml-auto">
							<Link to="/patient/notes">
								View all <MoveRight />
							</Link>
						</Button>
					</CardTitle>
					<div className="space-y-4 px-2 pb-2">
						{notesData.map((d, index) => (
							<Card
								key={d.id ?? index}
								className="transition-shadow animate-slide-up hover:shadow-none bg-background-secondary pt-2 pr-4"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-5">
									<div className="flex items-start gap-4 mb-1">
										<Icon>
											<Stethoscope className="h-5 w-5 text-primary" />
										</Icon>
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between gap-2 mb-1">
												<h3 className="font-semibold text-foreground">{d.title}</h3>
												<span className="text-xs text-card-foreground whitespace-nowrap">
													{format(new Date(d.date), "MMM d")}
												</span>
											</div>
											<p className="text-sm text-primary font-medium mb-3">{d.doctorName}</p>
											{d.content && <span className="text-sm text-card-foreground">{d.content}</span>}
										</div>
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
