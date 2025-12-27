import { CalendarOff, Clock4, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import type { Appointment } from "../../../../lib/api/mockData";
import { format, parse, startOfDay } from "date-fns";
import { Pill } from "../../../../components/ui/Pill";

type AppointmentProps = {
	appointments: Appointment[];
};

export const UpcomingAppointments = ({ appointments }: AppointmentProps) => {
	//TODO: bestämma ett sett hur datum ska se ut
	const today = startOfDay(new Date());

	appointments = appointments.filter(a => parse(a.date, "yyyy-MM-dd", today) >= today);
	console.log(today);

	return (
		<Card className="shadow-sm rounded-xl flex-1 flex flex-col justify-center">
			<CardHeader className="p-5 pb-0">Upcoming Appointments</CardHeader>
			<CardContent className="space-y-4 overflow-scroll">
				{appointments.length === 0 ? (
					<p className="text-center text-muted-foreground">No appointments scheduled</p>
				) : (
					<div className="flex flex-col gap-3 mt-2">
						{appointments.map((apt: Appointment) => (
							<Card key={apt.id} className="relative flex flex-row p-3 align-middle shadow-md rounded-xl">
								<CalendarOff className="absolute size-8 top-3 right-3 z-10 hover:bg-destructive-dark/70 rounded-sm p-1" />

								<CardContent className="flex flex-col gap-3 p-2 md:flex-row md:items-center md:justify-between lg:p-6">
									<div className="flex gap-4 items-center">
										<div className="flex flex-col bg-(image:--gradient-primary) text-white py-3 p-6 rounded-md">
											<span className="text-2xl font-bold">{format(new Date(apt.date), "dd")}</span>
											<span className="text-sm">{format(new Date(apt.date), "MMM")}</span>
										</div>
										<div className="flex flex-col pt-2">
											<span className="font-semibold text-foreground">{format(new Date(apt.date), "EEEE")}</span>
											<span className="text-sm text-muted-foreground">
												<Clock4 className="inline size-4 mr-1 mb-1" />
												{apt.time}
											</span>
										</div>
									</div>

									<div>
										<div className="flex flex-row gap-2">
											<Pill variant="secondary" className="text-sm">
												<span>{apt.type}</span>
											</Pill>
											<Pill variant="default" className="text-sm">
												<span>{apt.status}</span>
											</Pill>
										</div>
										<div className="flex flex-col md:flex-col gap-4 m-2">
											<span className="font-bold text-lg text-foreground">
												<Stethoscope className="inline size-4 mr-1.5 mb-1" />
												{apt.doctorName}
											</span>
											<span className="text-sm text-muted-foreground">{apt.notes}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
