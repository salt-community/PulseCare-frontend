import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { sv } from "date-fns/locale"; // Svensk lokalisation
import "react-day-picker/dist/style.css"; // Bas-CSS

export function DatePicker() {
	const [selected, setSelected] = useState<Date>();

	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg border">
			<h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Välj datum</h2>

			<DayPicker
				mode="single"
				selected={selected}
				onSelect={setSelected}
				locale={sv}
				className="rounded-lg shadow-md"
				components={
					{
						//   IconLeft: () => (
						//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						//     </svg>
						//   ),
						//   IconRight: () => (
						//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						//     </svg>
						//   ),
					}
				}
				modifiersClassNames={{
					selected: "bg-blue-500 text-white rounded-full",
					today: "bg-blue-100 text-blue-900 border-2 border-blue-200",
					range_middle: "bg-blue-200 text-blue-900",
					range_end: "bg-blue-500 text-white rounded-r-full"
				}}
				modifiers={
					{
						//   weekend: [0, 6], // Söndag och lördag
					}
				}
			/>

			{selected && (
				<div className="mt-6 p-4 bg-gray-50 rounded-lg">
					<p className="text-sm text-gray-600">Valt datum:</p>
					<p className="text-xl font-semibold text-gray-900">{format(selected, "EEEE dd MMMM yyyy", { locale: sv })}</p>
				</div>
			)}
		</div>
	);
}
