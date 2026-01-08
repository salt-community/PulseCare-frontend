import { Calendar, Users, MoveRight, Clock, MessageSquare, User } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/PrimaryButton";
import { Pill } from "../../../components/ui/Pill";
import { DateBlock } from "../../../components/ui/DateBlock";
import { Link } from "@tanstack/react-router";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import Spinner from "../../../components/shared/Spinner";
import { useUser } from "@clerk/clerk-react";
import { useConversations } from "../../../hooks/useConversations";

export default function AdminDashboardPage() {
	const { user } = useUser();
	const { data, isLoading, isError } = useAdminDashboard();
	const { unreadCount } = useConversations({
		role: "doctor"
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}
	if (isError || !data) return <div>Failed to load dashboard...</div>;
	const { totalPatients, todayAppointments, recentPatients, upcomingAppointments } = data;
	return (
		<>
			<PageHeader title={`Welcome back ${user?.fullName ?? "Doctor"}`} description="Here's an overview of today's activities" />

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{/* Total Patients */}
				<Card className="shadow-none hover:shadow-none">
					<CardContent className="p-5 flex items-center justify-between gap-3">
						<div>
							<p className="text-xs text-card-foreground mb-0.5">Total Patients</p>
							<p className="text-xl font-bold text-success">{totalPatients}</p>
						</div>
						<div className="p-2.5 rounded-lg bg-primary-light shrink-0">
							<Users className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>

				{/* Today's Appointments */}
				<Card className="shadow-none hover:shadow-none">
					<CardContent className="p-5 flex items-center justify-between gap-3">
						<div>
							<p className="text-xs text-card-foreground mb-0.5">Today's Appointments</p>
							<p className="text-xl font-bold text-foreground">{todayAppointments}</p>
						</div>
						<div className="p-2.5 rounded-lg bg-primary-light shrink-0">
							<Calendar className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>

				{/* Unread Messages */}
				<Card className="shadow-none hover:shadow-none">
					<CardContent className="p-5 flex items-center justify-between gap-3">
						<div>
							<p className="text-xs text-card-foreground mb-0.5">Unread Messages</p>
							<p className="text-xl font-bold text-warning">{unreadCount}</p>
						</div>
						<div className="p-2.5 rounded-lg bg-primary-light shrink-0">
							<MessageSquare className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 min-[1100px]:grid-cols-2 gap-6 mb-6">
				<Card className="p-4 shadow-none hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<Users className="text-primary shrink-0" size={20} />
						Recent Patients
						<Button asChild variant="outline" size="default" className="ml-auto">
							<Link to="/admin/patients">
								View all <MoveRight />
							</Link>
						</Button>
					</CardTitle>
					<div className="flex flex-col gap-4 mt-2 px-2 pb-2">
						{recentPatients.map(patient => (
							<Link
								to="/admin/patients/$patientId"
								params={{ patientId: patient.id }}
								search={{ from: "dashboard" }}
								className="block transition-all"
								key={patient.id}
							>
								<Card className="bg-background-secondary">
									<CardContent className="p-5">
										<div className="flex items-center gap-4 min-w-0">
											<div className="p-2 rounded-full bg-primary/10 h-8 w-8 flex-shrink-0">
												<User className="h-4 w-4 text-primary" />
											</div>

											<div className="flex-1 min-w-0">
												<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
													<div className="min-w-0 truncate">
														<span className="font-medium text-foreground block">{patient.name}</span>
														<span className="text-sm text-secondary-foreground">{patient.email}</span>
													</div>

													<div className="mt-2 sm:mt-0 sm:ml-4">
														<Pill variant="default">
															{patient.conditions.length} condition
															{patient.conditions.length !== 1 ? "s" : ""}
														</Pill>
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</Card>
				<Card className="p-4 shadow-none hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3">
						<Calendar className="text-primary shrink-0" size={20} />
						Upcoming Appointments
						<Button asChild variant="outline" size="default" className="ml-auto">
							<Link to="/admin/calendar">
								<div className="flex flex-wrap items-center gap-1">
									<span>View</span>
									<span>calendar</span>
									<MoveRight />
								</div>
							</Link>
						</Button>
					</CardTitle>
					<div className="flex flex-col gap-4 mt-2 px-2 pb-2">
						{upcomingAppointments.map(appointment => (
							<Card key={appointment.id} className="bg-background-secondary hover:shadow-none">
								<CardContent className="p-5">
									<div className="flex items-center gap-4">
										<DateBlock date={appointment.date} size="sm" />

										{/* Details */}
										<div className="flex-1">
											<div className="mb-1">
												<span className="font-medium text-sm text-foreground">{appointment.patientName}</span>
											</div>
											<div className="flex items-center gap-2 text-sm text-card-foreground">
												<Clock className="h-4 w-4" />
												<span>{appointment.time}</span>
												<Pill variant="default">{appointment.type}</Pill>
											</div>
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
