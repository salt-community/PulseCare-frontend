import { Card, CardContent } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import PageHeader from "../../../components/shared/PageHeader";

export default function AppointmentsPage() {
	const data = mockAppointments;

	return (
		<>
			<PageHeader title="Appointments" description="View and manage your upcoming appointments" />

			{data.length === 0 ? (
				<Card className="shadow-card">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Calendar className="h-12 w-12 text-card-foreground mb-4" />
						<p className="text-lg font-medium text-foreground mb-2">No appointments scheduled</p>
						<p className="text-card-foreground">Your upcoming appointments will appear here</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{data.map((d, index) => (
						<Card key={d.id} className=" transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
							<CardContent className="p-5">
								<div className="flex flex-col md:flex-row md:items-center gap-4">
									{/* Date Block */}
									<div className="flex items-center gap-4 md:w-48">
										<div className="p-4 rounded-xl bg-(image:--gradient-primary) text-white text-center min-w-17.5">
											<p className="text-2xl font-bold text-white">{format(new Date(d.date), "d")}</p>
											<p className="text-xs text-white/80 uppercase">{format(new Date(d.date), "MMM")}</p>
										</div>
										<div>
											<p className="font-medium text-foreground">{format(new Date(d.date), "EEEE")}</p>
											<div className="flex items-center gap-1 text-sm text-card-foreground">
												<Clock className="h-4 w-4" />
												<span>{d.time}</span>
											</div>
										</div>
									</div>

									{/* Details */}
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<Pill variant="secondary">{d.type}</Pill>
											<Pill>{d.status}</Pill>
										</div>
										<div className="flex items-center gap-2 text-foreground mb-1">
											<User className="h-4 w-4 text-card-foreground" />
											<span className="font-medium">{d.doctorName}</span>
										</div>
										{d.notes && <p className="text-sm text-card-foreground mt-2">{d.notes}</p>}
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
