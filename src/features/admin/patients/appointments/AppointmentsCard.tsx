import { CalendarOff, Clock4, FileText, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/Card";
import type { Appointment } from "../../../../lib/api/mockData";
import { format } from "date-fns";
import { Pill } from "../../../../components/ui/Pill";
import { AddNotesForm } from "./AddNotesForm";

type AppointmentsCardProps = {
	appointments: Appointment[];
	isUpcoming: boolean;
};

export const AppointmentsCard = ({ appointments, isUpcoming }: AppointmentsCardProps) => {
	const cardHeader = isUpcoming ? "Upcoming Appointments" : "Previous Appointments";

	return (
		<div className="flex-1 flex flex-col">
			<CardHeader className="font-semibold text-xl p-0  ps-4">{cardHeader}</CardHeader>
			<CardContent className="flex-1 space-y-4">
				{appointments.length === 0 ? (
					<Card className="flex h-full items-center justify-center mt-2 shadow-md hover:shadow-md">
						<p className="text-center text-muted-foreground">No appointments scheduled</p>
					</Card>
				) : (
					<div className="flex flex-col gap-3 mt-2">
						{appointments.map((apt: Appointment) => (
							<Card key={apt.id} className="relative flex flex-row p-3 align-middle shadow-md hover:shadow-md rounded-xl">
								{isUpcoming ? (
									<CalendarOff className="absolute size-8 top-3 right-3 z-10 hover:bg-destructive-dark/70 rounded-sm p-1" />
								) : (
									<></>
								)}
								<CardContent className="flex flex-col gap-3 p-2 md:flex-row md:items-center  lg:p-2 w-full">
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

									<div className="w-full">
										<div className="flex flex-row gap-2">
											<Pill variant="secondary">
												<span>{apt.type}</span>
											</Pill>
											<Pill variant="default">
												<span>{apt.status}</span>
											</Pill>
										</div>
										<div className="flex flex-col gap-1 m-2">
											<span className="font-bold text-lg text-foreground">
												<Stethoscope className="inline size-4 mr-1.5 mb-1" />
												{apt.doctorName}
											</span>
											<span className="text-sm text-muted-foreground">
												<span className="font-semibold text-foreground/70">Reason:</span> {apt.reason}
											</span>
										</div>
										<div className="my-3 border-t w-full" />

										<div className="flex flex-col gap-2 text-sm text-muted-foreground">
											<div className="flex justify-between">
												<span className="flex gap-2 font-semibold text-foreground">
													<FileText className="size-5" />
													<span className="font-semibold text-foreground/70">Notes</span>
												</span>
												<AddNotesForm appointmentId={apt.id} />
											</div>
											{apt.notes!.length > 0 ? (
												apt.notes!.map(n => (
													<>
														<p key={n.id}>{n.content}</p>
													</>
												))
											) : (
												<p className="italic text-muted-foreground">No doctor’s note added yet</p>
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
