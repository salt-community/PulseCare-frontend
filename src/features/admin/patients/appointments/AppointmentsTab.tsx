import { Calendar } from "lucide-react";
import { CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { Appointment, Patient } from "../../../../lib/api/mockData";
import { parse, startOfDay } from "date-fns";
import { AppointmentsCard } from "./AppointmentsCard";
import { AddAppointmentForm } from "./AddAppointmentForm";

type AppointmentProps = {
	appointments: Appointment[];
	patient: Patient;
};

export const AppointmentsTab = ({ appointments, patient }: AppointmentProps) => {
	//TODO: komma överrens hur ett datum ska se ut
	const today = startOfDay(new Date());
	const upcomingApts = appointments.filter(a => parse(a.date, "yyyy-MM-dd", today) >= today);
	const prevApts = appointments.filter(a => parse(a.date, "yyyy-MM-dd", today) < today);

	return (
		<>
			<div className="flex justify-between items-center">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						<Calendar className="w-5 h-5" /> Appointments
					</CardTitle>
				</CardHeader>
				<AddAppointmentForm patient={patient} />
			</div>
			<div className="flex flex-col md:flex-row gap-6">
				<AppointmentsCard appointments={upcomingApts} isUpcoming={true} />
				<AppointmentsCard appointments={prevApts} isUpcoming={false} />
			</div>
		</>
	);
};
