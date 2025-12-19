import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { Calendar, Clock4, MoveRight, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";

export default function PatientDashboard() {
	const data = mockAppointments;
	const exampleUser = {
		fullName: "John Doe"
	};

	return (
		<>
			<div>Welcome back {exampleUser.fullName}</div>
			<Card className="mt-4 p-4">
				<CardTitle className="flex items-center gap-2 text-foreground p-3">
					<Calendar />
					Upcoming Appointments
					<button className="ml-auto text-sm hover:bg-primary-light p-2 hover:text-primary-dark rounded-md p-1 text-primary font-medium">
						View All <MoveRight className="inline size-4 mb-0.5" />
					</button>
				</CardTitle>
				<div className="flex flex-col gap-3 mt-2">
					{data.map(d => (
						<Card key={d.id} className="p-3">
							<CardContent className="flex flex-col">
								<div className="flex flex-col gap-4 m-2">
									<Pill className="h-5" variant="secondary">
										<span className="">{d.type}</span>
									</Pill>
									<div className="flex flex-col gap-4 m-2">
										<span className="font-bold">
											<Stethoscope className="inline size-4 mr-1.5 mb-1" />
											{d.doctorName}
										</span>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="py-3 p-6 rounded-md">
										<Calendar className="inline size-4" />
										<span className="text-2xl font-bold">{format(new Date(d.date), "dd")}</span>
										<span>{format(new Date(d.date), "MMM")}</span>
									</div>
									<div className="pt-2">
										<span className="font-semibold">{format(new Date(d.date), "EEEE")}</span>
										<span>
											<Clock4 className="inline size-4 mr-1 mb-1" />
											{d.time}
										</span>
									</div>
								</div>
								<div className="flex flex-col md:flex-col gap-4 m-2">
									<span>{d.notes}</span>
								</div>
								{/* <br /> */}
								{/* <br /> */}
							</CardContent>
						</Card>
					))}
				</div>
			</Card>
		</>
	);
}
