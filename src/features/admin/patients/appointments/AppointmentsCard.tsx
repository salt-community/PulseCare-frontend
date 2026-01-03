import { CalendarOff, Clock4, FileText, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import type { Appointment } from "../../../../lib/api/mockData";
import { format } from "date-fns";
import { Pill } from "../../../../components/ui/Pill";
import { DateBlock } from "../../../../components/ui/DateBlock";
import { AddNotesForm } from "./AddNotesForm";

type AppointmentsCardProps = {
	appointments: Appointment[];
	isUpcoming: boolean;
};

export const AppointmentsCard = ({ appointments, isUpcoming }: AppointmentsCardProps) => {
	const cardHeader = isUpcoming ? "Upcoming Appointments" : "Previous Appointments";

	return (
		<div className="flex-1 flex flex-col min-w-0">
			<CardHeader className="font-semibold text-xl p-0 ps-4">{cardHeader}</CardHeader>
			<CardContent className="flex-1 space-y-4 p-0">
				{appointments.length === 0 ? (
					<Card className="flex h-full items-center justify-center mt-2 hover:shadow-none p-4">
						<p className="text-center text-muted-foreground">No appointments scheduled</p>
					</Card>
				) : (
					<div className="flex flex-col gap-3 mt-2">
						{appointments.map((apt: Appointment) => (
							<Card key={apt.id} className="hover:shadow-none min-w-0">
								{isUpcoming ? (
									<CalendarOff className="absolute size-8 top-3 right-3 z-10 hover:bg-destructive-dark/70 rounded-sm p-1 shrink-0" />
								) : (
									<></>
								)}
								<CardContent className="flex flex-col gap-4 md:flex-row md:items-start p-5 w-full min-w-0">
									<div className="flex flex-col items-center md:items-start md:shrink-0">
										<DateBlock date={apt.date} />
										<div className="flex flex-col pt-2">
											<span className="font-semibold text-foreground text-sm">
												{format(new Date(apt.date), "EEEE")}
											</span>
											<span className="text-xs text-muted-foreground">
												<Clock4 className="inline size-3 mr-1" />
												{apt.time}
											</span>
										</div>
									</div>

									<div className="w-full min-w-0">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 flex-wrap">
											<span className="font-semibold text-foreground flex items-center gap-2 shrink-0">
												<Stethoscope className="size-4 shrink-0" />
												{apt.doctorName}
											</span>
											<div className="flex flex-row gap-2 flex-wrap">
												<Pill variant="secondary">
													<span>{apt.type}</span>
												</Pill>
												<Pill variant="default">
													<span>{apt.status}</span>
												</Pill>
											</div>
										</div>

										<span className="text-sm text-muted-foreground block mb-3 wrap-break-word">
											<span className="font-semibold text-foreground">Reason:</span> {apt.reason}
										</span>

										<div className="border-t border-foreground/10 pt-3">
											<div className="flex justify-between items-center mb-2 flex-wrap gap-2">
												<span className="flex gap-2 font-semibold text-foreground text-sm shrink-0">
													<FileText className="size-4 shrink-0" />
													Notes
												</span>
												<AddNotesForm appointmentId={apt.id} />
											</div>
											{apt.notes!.length > 0 ? (
												apt.notes!.map(n => (
													<p key={n.id} className="text-sm text-muted-foreground wrap-break-word">
														{n.content}
													</p>
												))
											) : (
												<p className="italic text-sm text-muted-foreground">No doctor's note added yet</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</CardContent>
		</div>
	);
};
