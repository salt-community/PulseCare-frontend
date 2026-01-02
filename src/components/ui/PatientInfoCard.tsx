import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "./Card";
import { User, Mail, Phone, ChevronRight } from "lucide-react";
import { Pill } from "./Pill";
import type { Patient } from "../../lib/api/mockData";

interface PatientInfoCardProps {
	patient: Patient;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
	return (
		<Link to={`/admin/patients/${patient.id}`} className="block transition-all">
			<Card className="transition-all hover:shadow-none">
				<CardContent className="p-5">
					<div className="flex items-center gap-4">
						<div className="p-2.5 rounded-full bg-primary/10 h-10 w-10 shrink-0 flex items-center justify-center">
							<User className="h-5 w-5 text-primary" />
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
								<span className="font-medium text-foreground">{patient.name}</span>
								<div className="flex items-center gap-2 flex-wrap justify-end">
									{patient.conditions.slice(0, 2).map(condition => (
										<Pill key={condition} variant="secondary">
											{condition}
										</Pill>
									))}
									{patient.conditions.length > 2 && <Pill variant="secondary">+{patient.conditions.length - 2}</Pill>}
								</div>
							</div>

							<div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
								<span className="flex items-center gap-2">
									<Mail className="h-4 w-4" />
									{patient.email}
								</span>
								<span className="flex items-center gap-2">
									<Phone className="h-4 w-4" />
									{patient.phone}
								</span>
							</div>
						</div>

						<ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
