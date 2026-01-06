import { Pencil, Activity } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { Button } from "../../../../components/ui/PrimaryButton";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import { useUser } from "@clerk/clerk-react";
import type { HealthStat, Patient } from "../../../../lib/api/mockData";

type EditHealthStatsProps = {
	patient: Patient;
	healthStat: HealthStat;
};

export const EditHealthStatsForm = ({ patient, healthStat }: EditHealthStatsProps) => {
	const { user } = useUser();
	const [open, setOpen] = useState(false);

	const healthStatTypes = [
		{ value: "blood_pressure", label: "Blood Pressure", unit: "mmHg" },
		{ value: "glucose", label: "Glucose", unit: "mg/dL" },
		{ value: "cholesterol", label: "Cholesterol", unit: "mg/dL" },
		{ value: "heart_rate", label: "Heart Rate", unit: "bpm" },
		{ value: "weight", label: "Weight", unit: "lbs" }
	];

	const statusOptions = ["normal", "warning", "critical"];

	const [date, setDate] = useState<string>(healthStat.date);
	const [type, setType] = useState<string>(healthStat.type);
	const [value, setValue] = useState<string>(healthStat.value);
	const [unit, setUnit] = useState<string>(healthStat.unit);
	const [status, setStatus] = useState<string>(healthStat.status);

	const resetForm = () => {
		setDate(healthStat.date);
		setType(healthStat.type);
		setValue(healthStat.value);
		setUnit(healthStat.unit);
		setStatus(healthStat.status);
	};

	const handleTypeChange = (selectedType: string) => {
		setType(selectedType);
		const selectedStat = healthStatTypes.find(stat => stat.value === selectedType);
		if (selectedStat) {
			setUnit(selectedStat.unit);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const updatedHealthStat = {
			id: healthStat.id,
			patientId: patient.id,
			doctorId: user?.id,
			type: type,
			value: value,
			unit: unit,
			date: date,
			status: status
		};

		console.log("Update health stat:", updatedHealthStat);

		resetForm();
		setOpen(false);
	};

	return (
		<>
			<Button variant={"outline"} size={"icon"} className="[&_svg]:size-4" onClick={() => setOpen(true)}>
				<Pencil />
			</Button>

			<DialogModal title="Edit Health Stat" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 ">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
						<Activity />
					</div>
					<div>
						<p className="text-sm  text-muted-foreground">Edit health stat for</p>
						<p className="text-lg font-semibold text-foreground">{patient.name}</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="flex flex-col">
						<DialogInput type="date" label="Date" value={date} onChange={setDate} required className="w-50" />

						<div className="grid grid-cols-1 gap-3 items-end p-2 w-full">
							<div className="pe-4">
								<label className="block p-1 text-md font-semibold">Type</label>
								<select
									className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
									value={type}
									onChange={e => handleTypeChange(e.target.value)}
									required
								>
									<option value="" disabled>
										Select type
									</option>
									{healthStatTypes.map(stat => (
										<option key={stat.value} value={stat.value}>
											{stat.label}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<div>
									<label className="block p-1 text-md font-semibold">Value</label>
									<input
										type="text"
										className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
										value={value}
										onChange={e => setValue(e.target.value)}
										placeholder="e.g., 120/80, 98, 175"
										required
									/>
								</div>

								<div>
									<label className="block p-1 text-md font-semibold">Unit</label>
									<input
										type="text"
										className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full bg-muted/50"
										value={unit}
										readOnly
									/>
								</div>
							</div>

							<div className="pe-4">
								<label className="block p-1 text-md font-semibold">Status</label>
								<select
									className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
									value={status}
									onChange={e => setStatus(e.target.value)}
									required
								>
									<option value="" disabled>
										Select status
									</option>
									{statusOptions.map(s => (
										<option key={s} value={s}>
											{s.charAt(0).toUpperCase() + s.slice(1)}
										</option>
									))}
								</select>
							</div>
						</div>

						<Button type="submit">Update Health Stat</Button>
					</div>
				</form>
			</DialogModal>
		</>
	);
};
