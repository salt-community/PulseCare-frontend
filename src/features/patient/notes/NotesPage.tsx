import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { mockNotes } from "../../../lib/api/mockData";
import { Calendar, Stethoscope } from "lucide-react";

export default function NotesPage() {
	const data = mockNotes;

	return (
		<>
			<PageHeader title={"Appointment Notes"} description="Notes from your healthcare providers after appointments" />
			<div className="flex flex-col gap-3 mt-2">
				{data.map(d => (
					<Card key={d.id} className="p-2">
						<CardContent className="flex flex-col gap-2 py-4 px-2 md:grid grid-cols-[4rem_auto_5.5rem] justify-stretch">
							<div>
								<span className="inline-flex items-center justify-center bg-secondary w-10 h-10 rounded-xl">
									<Stethoscope className="w-4 h-4" strokeWidth={1.5} />
								</span>
							</div>
							<div>
								<div className="text-xl font-bold">{d.title}</div>
								<div className="text-primary mb-2">{d.doctorName}</div>
								<div>
									<span className="font-bold">Note: </span>
									{d.content}
								</div>
								<div className="mb-2">
									<span className="font-bold">Diagnosis: </span>
									{d.diagnosis}
								</div>
								<div className="flex gap-2 items-center bg-background rounded px-2">
									<Calendar size={18} strokeWidth={1.5} />
									{d.appointmentDetails}
								</div>
							</div>
							<div>{d.date}</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
