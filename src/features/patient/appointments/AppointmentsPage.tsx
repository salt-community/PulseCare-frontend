import { Card, CardContent } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { CalendarOff, Clock4, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import { useState } from "react";
import { DialogModal } from "../../../components/shared/DialogModal";

type Appointment = (typeof mockAppointments)[number];

export default function AppointmentsPage() {
	const data = mockAppointments;

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<Appointment | null>(null);

	function handleCardClick(appointment: Appointment) {
		setSelected(appointment);
		setDialogOpen(true);
	}

	return (
		<>
			<h1 className="font-bold text-3xl">Appointments</h1>
			<p className="text-foreground/50">View and manage your upcoming appointments</p>

			<DialogModal
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				title={selected ? `Appointment with ${selected.doctorName}` : "Appointment"}
				description={selected ? selected.notes : undefined}
				showTrigger={false}
			>
				{selected && (
					<div className="mt-4 space-y-2">
						<div className="text-foreground">
							<strong>Date:</strong> {format(new Date(selected.date), "yyyy-MM-dd")}
						</div>
						<div className="text-foreground">
							<strong>Time:</strong> {selected.time}
						</div>
						<div className="text-foreground">
							<strong>Type:</strong> {selected.type}
						</div>
						<div className="text-foreground">
							<strong>Status:</strong> {selected.status}
						</div>
					</div>
				)}
			</DialogModal>
			{data.length === 0 ? (
				<p className="mt-4 text-center text-muted-foreground">No appointments available</p>
			) : (
				<div className="flex flex-col gap-3 mt-2">
					{data.map(d => (
						<Card key={d.id} className="relative flex flex-row p-3 align-middle" onClick={() => handleCardClick(d)}>
							<CalendarOff className="absolute size-8 top-3 right-3 z-10 hover:bg-destructive-dark/70 rounded-sm p-1" />
							<CardContent className="flex flex-col gap-3 p-2 md:flex-row md:items-center md:align-middle md:justify-center lg:p-6">
								<div className="flex gap-4 items-center">
									<div className="flex flex-col bg-(image:--gradient-primary) text-white py-3 p-6 rounded-md">
										<span className="text-2xl font-bold">{format(new Date(d.date), "dd")}</span>
										<span>{format(new Date(d.date), "MMM")}</span>
									</div>
									<div className="flex flex-col pt-2">
										<span className="font-semibold">{format(new Date(d.date), "EEEE")}</span>
										<span>
											<Clock4 className="inline size-4 mr-1 mb-1" />
											{d.time}
										</span>
									</div>
								</div>
								<div>
									<div className="flex flex-row gap-2">
										<Pill className="" variant="secondary">
											<span className="">{d.type}</span>
										</Pill>
										<Pill>
											<span className="">{d.status}</span>
										</Pill>
									</div>
									<div className="flex flex-col md:flex-col gap-4 m-2">
										<span className="font-bold">
											<Stethoscope className="inline size-4 mr-1.5 mb-1" />
											{d.doctorName}
										</span>
										<span>{d.notes}</span>
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
