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
			<div className="flex justify-between items-center ps-4">
				<AddAppointmentForm patient={patient} />
			</div>
			<div className="md:grid md:grid-cols-[50%_50%] flex flex-col">
				<AppointmentsCard appointments={upcomingApts} isUpcoming={true} />
				<AppointmentsCard appointments={prevApts} isUpcoming={false} />
			</div>
		</>
	);
};
