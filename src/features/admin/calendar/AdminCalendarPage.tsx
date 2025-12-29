import { useState } from "react";
import { DatePicker } from "../../../components/ui/DatePicker";
import { Card, CardContent } from "../../../components/ui/Card";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export const AdminCalendarPage = () => {
	const [selected, setSelected] = useState<Date>();
	return (
		<div className="flex flex-col gap-10 lg:flex-row">
			<DatePicker selected={selected} onSelect={setSelected} />
			<div className="flex-1 flex flex-col gap-4">
				<h2 className="flex items-center gap-2 text-2xl font-semibold">
					<Calendar className="h-6 text-primary" />
					{selected ? format(selected, "EEEE dd MMMM yyyy", { locale: enGB }) : "Select a date"}
				</h2>
				<Card className="p-10">
					<CardContent className="flex items-center gap-4 flex-col">
						<Calendar className="h-10 w-50" />
						No appointments on this date
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
