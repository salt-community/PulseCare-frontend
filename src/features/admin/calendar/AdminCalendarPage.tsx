import { useEffect, useRef, useState } from "react";
import { DatePicker } from "../../../components/ui/DatePicker";
import { Card, CardContent } from "../../../components/ui/Card";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import { ScheduleAppointment } from "./ScheduleAppointment";
import { EditAppointment } from "./EditAppointment";
import PageHeader from "../../../components/shared/PageHeader";
import { DialogModal } from "../../../components/shared/DialogModal";
import { Pill } from "../../../components/ui/Pill";
import { Button } from "../../../components/ui/PrimaryButton";
import { useAllAppointments, useDeleteAppointment } from "../../../hooks/useAppointments";
import type { Appointment } from "../../../lib/types/appointment";
import { toast } from "react-toastify";
import Spinner from "../../../components/shared/Spinner";

export const AdminCalendarPage = () => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<Date | undefined>(new Date());
	const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
	const appointmentsRef = useRef<HTMLDivElement>(null);

	const { data: appointments = [], isLoading, error } = useAllAppointments();
	const deleteMutation = useDeleteAppointment();

	useEffect(() => {
		if (selected && appointmentsRef.current) {
			appointmentsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [selected]);

	function handleCardClick(appointment: Appointment) {
		setSelectedAppointment(appointment);
		setDialogOpen(true);
	}

	function handleEdit() {
		setDialogOpen(false);
		setEditDialogOpen(true);
	}

	async function handleDelete() {
		if (!selectedAppointment) return;

		try {
			await deleteMutation.mutateAsync(selectedAppointment.id);
			toast.success("Appointment deleted successfully!");
			setDialogOpen(false);
			setSelectedAppointment(null);
		} catch (error) {
			toast.error("Failed to delete appointment. Please try again.");
			console.log(error);
		}
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">Error loading appointments.</div>;
	}

	return (
		<>
			<div className="flex flex-wrap justify-between items-center">
				<PageHeader title={"Calendar"} description="View and manage all patient appointments" />
				<ScheduleAppointment currentDate={selected ?? new Date()} />
			</div>

			<DialogModal
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				title={selectedAppointment ? `Appointment - ${selectedAppointment.patientName || "Unknown Patient"}` : "Appointment"}
				description={selectedAppointment?.reason ?? undefined}
				showTrigger={false}
			>
				{selectedAppointment && (
					<>
						<div className="mt-4 space-y-2">
							<div className="text-foreground">
								<strong>Date:</strong> {format(new Date(selectedAppointment.date), "yyyy-MM-dd")}
							</div>
							<div className="text-foreground">
								<strong>Time:</strong> {selectedAppointment.time}
							</div>
							<div className="text-foreground">
								<strong>Status:</strong> {selectedAppointment.status}
							</div>
						</div>
						<div className="flex gap-2 justify-end">
							<Button onClick={handleEdit}>Edit</Button>
							<Button onClick={handleDelete} variant={"destructive"} disabled={deleteMutation.isPending}>
								{deleteMutation.isPending ? "Deleting..." : "Remove"}
							</Button>
						</div>
					</>
				)}
			</DialogModal>

			<EditAppointment appointment={selectedAppointment} open={editDialogOpen} onOpenChange={setEditDialogOpen} />

			<div className="flex flex-col gap-10 lg:flex-row">
				<DatePicker selected={selected} onSelect={setSelected} appointments={appointments} />
				<div ref={appointmentsRef} className="flex-1 flex flex-col gap-4">
					<h2 className="flex items-center gap-2 text-2xl font-semibold">
						<Calendar className="h-6 text-primary" />
						{selected ? format(selected, "EEEE dd MMMM yyyy", { locale: enGB }) : "Select a date"}
					</h2>
					{!selected ||
					appointments.filter(apt => apt.date.startsWith(format(selected, "yyyy-MM-dd", { locale: enGB }))).length === 0 ? (
						<Card className="p-10">
							<CardContent className="flex items-center gap-4 flex-col">
								<Calendar className="h-10 w-50" />
								No appointments on this date
							</CardContent>
						</Card>
					) : (
						<div className="space-y-4">
							{appointments
								.filter(apt => apt.date.startsWith(format(selected, "yyyy-MM-dd", { locale: enGB })))
								.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
								.map((d, index) => (
									<Card
										key={d.id}
										className="transition-all animate-slide-up cursor-pointer"
										style={{ animationDelay: `${index * 0.1}s` }}
										onClick={() => handleCardClick(d)}
									>
										<CardContent className="p-5">
											<div className="flex flex-col md:flex-row md:items-center gap-4">
												<div>
													<div className="flex items-center gap-1 text-sm text-foreground">
														<Clock className="h-4 w-4" />
														<span className="font-medium">{d.time}</span>
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
														<span className="font-medium">{d.patientName || "Unknown Patient"}</span>
													</div>
													{d.reason && <p className="text-sm text-card-foreground mt-2">{d.reason}</p>}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
