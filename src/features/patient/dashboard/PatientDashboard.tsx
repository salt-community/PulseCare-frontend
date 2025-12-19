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
						<Card key={d.id} className="p-3 bg-background-secondary">
							<CardContent className="flex flex-col">
								<div className="flex flex-col gap-4 mr-2">
									<Pill className="h-5" variant="secondary">
										<span className="">{d.type}</span>
									</Pill>
									<div className="flex flex-col gap-4 mr-2">
										<span className="font-bold">
											<Stethoscope className="inline size-4 mr-1.5 mb-1" />
											{d.doctorName}
										</span>
									</div>
								</div>
								<div className=" border-b border-foreground/20 mt-2 pb-2 ">
									<Calendar className="inline size-4 mr-1 mb-1" />
									<span className="mr-1 text-sm">{format(new Date(d.date), "dd MMM")}</span>
									<span className="mr-4 text-sm">{format(new Date(d.date), "EEEE")}</span>
									<span>
										<Clock4 className="inline size-4 mx-1 mb-1" />
										{d.time}
									</span>
								</div>
								<div className="flex flex-col md:flex-col gap-4 mt-2">
									<span>{d.notes}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Card>
		</>
	);
}
