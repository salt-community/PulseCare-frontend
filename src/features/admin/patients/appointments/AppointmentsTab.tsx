import { Calendar, Plus } from "lucide-react";
import { CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { Appointment } from "../../../../lib/api/mockData";
import { parse, startOfDay } from "date-fns";
import { AppointmentsCard } from "./AppointmentsCard";

type AppointmentProps = {
	appointments: Appointment[];
};

export const AppointmentsTab = ({ appointments }: AppointmentProps) => {
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
				<button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition text-sm">
					<Plus className="w-4 h-4" /> New Appointment
				</button>
			</div>
			<div className="flex flex-col md:flex-row gap-6">
				<AppointmentsCard appointments={upcomingApts} isUpcoming={true} />
				<AppointmentsCard appointments={prevApts} isUpcoming={false} />
			</div>
		</>
	);
};
