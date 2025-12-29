import { Calendar, Users } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardTitle } from "../../../components/ui/Card";

export default function AdminDashboardPage() {
	const exampleUser = {
		fullName: "John Doe"
	};

	return (
		<>
			<PageHeader title={`Welcome back ${exampleUser.fullName}`} description="Here's an overview of today's activities" />
			<div className="flex gap-6">
				<Card className="flex-1 mt-6 p-4 shadow-none hover:shadow-none">
					<CardTitle className="flex items-center gap-2 text-foreground p-3 text-lg md:text-xl lg:text-2xl">
						<Users className="text-primary shrink-0" size={20} />
						Recent Patients
					</CardTitle>
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
