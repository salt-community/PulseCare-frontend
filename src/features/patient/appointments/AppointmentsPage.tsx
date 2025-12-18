import { Card, CardContent } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { Clock4 } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";

export default function AppointmentsPage() {
	const data = mockAppointments;

	return (
		<>
			<h1>Appointments</h1>
			<p>View and manage your upcoming appointments</p>
			<div className="flex flex-col gap-3 mt-2">
				{data.map(d => (
					<Card key={d.id} className="p-3">
						<CardContent className="flex flex-col md:flex-row">
							<div className="flex gap-4">
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
							<div className="flex flex-row gap-4 m-2">
								<Pill className="h-5" variant="secondary">
									<span className="">{d.type}</span>
								</Pill>
								<Pill>
									<span className="">{d.status}</span>
								</Pill>
							</div>
							<div>
								<span>{d.doctorName}</span>
								<span>{d.notes}</span>
							</div>
							{/* <br /> */}
							{/* <br /> */}
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
