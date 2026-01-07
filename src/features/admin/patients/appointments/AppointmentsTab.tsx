import { AppointmentsCard } from "./AppointmentsCard";
import { AddAppointmentForm } from "./AddAppointmentForm";
import type { Appointment, PatientDetailsVm } from "../../../../lib/types";

type AppointmentProps = {
	appointments: Appointment[];
	patient: PatientDetailsVm;
};

export const AppointmentsTab = ({ appointments, patient }: AppointmentProps) => {
	//TODO: komma överrens hur ett datum ska se ut
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const upcomingApts = appointments.filter(a => new Date(a.date) >= today).sort((a, b) => +new Date(a.date) - +new Date(b.date));

	const prevApts = appointments.filter(a => new Date(a.date) < today).sort((a, b) => +new Date(b.date) - +new Date(a.date));

	return (
		<>
			<div className="flex justify-between items-center my-2">
				<AddAppointmentForm patient={patient} />
			</div>
			<div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
				<AppointmentsCard appointments={upcomingApts} isUpcoming={true} />
				<AppointmentsCard appointments={prevApts} isUpcoming={false} />
			</div>
		</>
	);
};
