import { Link } from '@tanstack/react-router'; 
import { Card, CardContent } from "./Card";
import { User, Mail, Phone, ChevronRight } from "lucide-react";
import { Pill } from "./Pill"; 
import type { Patient } from "../../lib/api/mockData";

interface PatientInfoCardProps {
  patient: Patient;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
  return (
    <Link
      to={`/admin/patients/${patient.id}`} 
      className="block transition-all"
    >
      <Card className="transition-all">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-lg md:text-xl text-foreground">{patient.name}</h3>
                <div className="flex items-center gap-2">
                  {patient.conditions.slice(0, 2).map((condition) => (
                    <Pill key={condition} variant="secondary" className="text-sm md:text-base">
                      {condition}
                    </Pill>
                  ))}
                  {patient.conditions.length > 2 && (
                    <Pill variant="secondary" className="text-sm md:text-base">
                      +{patient.conditions.length - 2}
                    </Pill>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-5 w-5" /> {patient.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> {patient.phone}
                </span>
              </div>
            </div>

            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
