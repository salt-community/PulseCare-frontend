import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, addMonths } from "date-fns";
import { enGB } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

type DatePickerProps = {
	selected: Date | undefined;
	onSelect: (date: Date | undefined) => void;
};

export function DatePicker({ selected, onSelect }: DatePickerProps) {
	const [month, setMonth] = useState<Date>(new Date(2025, 11, 1));

	const handlePrev = () => setMonth(m => addMonths(m, -1));
	const handleNext = () => setMonth(m => addMonths(m, 1));

	return (
		<div className="p-4 sm:p-6 w-full max-w-sm mx-auto bg-white border-0.5">
			<div className="flex items-center justify-between mb-3 px-1 sm:px-2">
				<button type="button" onClick={handlePrev} className="p-2 sm:p-3 hover:text-primary cursor-pointer transition-colors">
					<CircleChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
				</button>

				<span className="text-base sm:text-lg font-medium">{format(month, "MMMM yyyy", { locale: enGB })}</span>

				<button type="button" onClick={handleNext} className="p-2 sm:p-3 hover:text-primary cursor-pointer transition-colors">
					<CircleChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
				</button>
			</div>

			<div
				className="
          origin-top w-full overflow-hidden
          [@media(max-width:360px)]:scale-[0.90]
          [@media(max-width:340px)]:scale-[0.85]
          [@media(max-width:320px)]:scale-[0.80]
        "
			>
				<DayPicker
					mode="single"
					selected={selected}
					onSelect={onSelect}
					locale={enGB}
					month={month}
					onMonthChange={setMonth}
					classNames={{
						caption: "hidden",
						caption_label: "hidden",
						table: "w-full text-xs sm:text-sm",
						head_cell: "text-gray-500 font-medium",
						cell: "h-8 w-8 sm:h-10 sm:w-10",
						day: "rounded-full hover:bg-primary-light transition-colors"
					}}
					components={{
						Nav: () => <div />
					}}
					modifiersClassNames={{
						selected: "!bg-primary text-white rounded-full",
						today: "bg-primary-light rounded-sm"
					}}
				/>
			</div>
		</div>
	);
}
