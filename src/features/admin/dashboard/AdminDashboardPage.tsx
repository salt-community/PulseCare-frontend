import { Calendar, Users, MoveRight } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/PrimaryButton";
import { Pill } from "../../../components/ui/Pill";
import { mockPatients } from "../../../lib/api/mockData";

export default function AdminDashboardPage() {
	const exampleUser = { fullName: "John Doe" };
	const recentPatients = mockPatients.slice(0, 3);

	return (
		<>
			<PageHeader title={`Welcome back ${exampleUser.fullName}`} description="Here's an overview of today's activities" />
			<div className="flex gap-6">
				<Card className="flex-1 mt-6 p-4 shadow-none hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3 text-lg md:text-xl lg:text-2xl">
						<Users className="text-primary shrink-0" size={20} />
						Recent Patients
						<Button variant="outline" size="default" className="ml-auto">
							View all <MoveRight />
						</Button>
					</CardTitle>
					<div className="flex flex-col gap-3 mt-2">
						{recentPatients.map(patient => (
							<Card key={patient.id} className="bg-background-secondary hover:shadow-none">
								<CardContent className="flex flex-row items-center justify-between">
									<div className="flex flex-row items-center gap-4">
										<div className="p-2 rounded-full bg-primary/10 h-8 w-8">
											<Users className="h-4 w-4 text-primary" />
										</div>
										<div className="flex flex-col">
											<span className="font-medium text-foreground">{patient.name}</span>
											<span className="text-sm text-secondary-foreground flex items-center gap-1">
												{patient.email}
											</span>
										</div>
									</div>
									<Pill variant="default">
										{patient.conditions.length} condition{patient.conditions.length !== 1 ? "s" : ""}
									</Pill>
								</CardContent>
							</Card>
						))}
					</div>
				</Card>
				<Card className="flex-1 mt-6 p-4 shadow-none hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3 text-lg md:text-xl lg:text-2xl">
						<Calendar className="text-primary shrink-0" size={20} />
						Upcoming Appointments
					</CardTitle>
				</Card>
			</div>
		</>
	);
}
