import { Card, CardContent, CardTitle } from "../../../components/ui/Card";
import { mockAppointments } from "../../../lib/api/mockData";
import { Calendar, Clock4, MoveRight, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { Pill } from "../../../components/ui/Pill";
import PageHeader from "../../../components/shared/PageHeader";
import { Button } from "../../../components/ui/PrimaryButton";

export default function PatientDashboard() {
	const data = mockAppointments;
	const exampleUser = {
		fullName: "John Doe"
	};

	return (
		<>
			<PageHeader title={`Welcome back ${exampleUser.fullName}`} description="Here's an overview of your health status" />
			<Card className="mt-4 p-4 hover:shadow-none">
				<CardTitle className="flex items-center gap-2 text-foreground p-3">
					<Calendar className="text-primary" />
					Upcoming Appointments
					<Button variant="outline" size="default" className="ml-auto">
						View all <MoveRight />
					</Button>
				</CardTitle>
				<div className="flex flex-col gap-3 mt-2">
					{data.map(d => (
						<Card key={d.id} className="p-3 bg-background-secondary hover:shadow-none">
							<CardContent className="flex flex-col">
								<div className="flex flex-col gap-4 mr-2">
									<Pill variant="secondary">
										<span className="">{d.type}</span>
									</Pill>
									<div className="flex flex-col gap-4 mr-2">
										<span className="text-foreground text-sm font-semibold">
											<Stethoscope className="text-card-foreground inline size-4 mr-1.5 mb-1" />
											{d.doctorName}
										</span>
									</div>
								</div>
								<div className="border-b border-foreground/20 mt-2 pb-2 flex flex-row items-center">
									<Calendar className="inline size-4 mr-1" />
									<span className="mr-1 text-sm">{format(new Date(d.date), "dd MMM")}</span>
									<span className="mr-4 text-sm">{format(new Date(d.date), "EEEE")}</span>
									<span className="flex flex-row text-sm items-center">
										<Clock4 className="inline size-4 mx-1" />
										{d.time}
									</span>
								</div>
								<div className="flex flex-col md:flex-col gap-4 mt-2 text-xs">
									<span>{d.reason}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Card>
		</>
	);
}
