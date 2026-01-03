import { Card, CardContent } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import PageHeader from "../../../components/shared/PageHeader";
import { DateBlock } from "../../../components/ui/DateBlock";

export default function AppointmentsPage() {
	const data = mockAppointments;

	return (
		<>
			<PageHeader title="Appointments" description="View and manage your upcoming appointments" />

			{data.length === 0 ? (
				<Card className="shadow-card hover:shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Calendar className="h-12 w-12 text-card-foreground mb-4" />
						<p className="text-lg font-medium text-foreground mb-2">No appointments scheduled</p>
						<p className="text-card-foreground">Your upcoming appointments will appear here</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{data.map((d, index) => (
						<Card
							key={d.id}
							className="transition-all animate-slide-up hover:shadow-none"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<CardContent className="p-5">
								<div className="flex flex-col min-[850px]:flex-row min-[850px]:items-center gap-4">
									{/* Date Block */}
									<div className="flex items-center gap-4 md:w-48">
										<DateBlock date={d.date} />
										<div>
											<p className="font-medium text-foreground">{format(new Date(d.date), "EEEE")}</p>
											<div className="flex items-center gap-1 text-sm text-card-foreground">
												<Clock className="h-4 w-4" />
												<span>{d.time}</span>
											</div>
										</div>
									</div>

									{/* Details */}
									<div className="flex-1 flex flex-col min-[850px]:flex-row min-[850px]:items-center justify-between gap-4">
										<div>
											<div className="flex items-center gap-2 mb-2">
												<User className="h-4 w-4 text-card-foreground shrink-0" />
												<span className="font-medium text-foreground">{d.doctorName}</span>
											</div>
											{d.reason && <p className="text-sm text-card-foreground">{d.reason}</p>}
										</div>
										<div className="flex items-center gap-2 flex-wrap">
											<Pill variant="secondary">{d.type}</Pill>
											<Pill>{d.status}</Pill>
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
