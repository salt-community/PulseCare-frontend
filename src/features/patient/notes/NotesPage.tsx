import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { mockNotes } from "../../../lib/api/mockData";
import { Calendar, Stethoscope, StickyNote } from "lucide-react";
import { format } from "date-fns";
import { Icon } from "../../../components/shared/Icon";

export default function NotesPage() {
	const data = mockNotes;

	return (
		<>
			<PageHeader title={"Appointment Notes"} description="Notes from your healthcare providers after appointments" />

			{data.length === 0 ? (
				<Card className="shadow-card">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<StickyNote className="h-12 w-12 text-card-foreground mb-4" />
						<p className="text-lg font-medium text-foreground mb-2">No notes yet</p>
						<p className="text-card-foreground">Notes from your appointments will appear here</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{data.map((d, index) => (
						<Card
							key={d.id}
							className="shadow-card hover:shadow-lg transition-shadow animate-slide-up"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<CardContent className="p-5">
								<div className="flex items-start gap-4 mb-4">
									<Icon>
										<Stethoscope className="h-5 w-5 text-primary" />
									</Icon>

									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between gap-2 mb-1">
											<h3 className="font-semibold text-foreground">{d.title}</h3>
											<span className="text-xs text-card-foreground whitespace-nowrap">
												{format(new Date(d.date), "MMM d, yyyy")}
											</span>
										</div>
										<p className="text-sm text-primary font-medium mb-3">{d.doctorName}</p>

										{d.content && (
											<div className="mb-3">
												<span className="text-sm font-semibold text-card-foreground">Note: </span>
												<span className="text-sm text-card-foreground">{d.content}</span>
											</div>
										)}

										{d.diagnosis && (
											<div className="mb-3">
												<span className="text-sm font-semibold text-card-foreground">Diagnosis: </span>
												<span className="text-sm text-card-foreground">{d.diagnosis}</span>
											</div>
										)}

										{d.appointmentDetails && (
											<div className="flex items-center gap-2 text-xs text-card-foreground bg-background-secondary px-3 py-2 rounded-lg">
												<Calendar className="h-3.5 w-3.5" />
												<span>{d.appointmentDetails}</span>
											</div>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</>
	);
}
