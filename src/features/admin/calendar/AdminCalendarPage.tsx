import { useState } from "react";
import { DatePicker } from "../../../components/ui/DatePicker";

export const AdminCalendarPage = () => {
	const [selected, setSelected] = useState<Date>();
	return <DatePicker selected={selected} onSelect={setSelected} />;
};
