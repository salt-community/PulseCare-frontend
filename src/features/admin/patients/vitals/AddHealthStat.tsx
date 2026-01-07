import { Plus, Activity } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import type { PatientDetailsVm } from "../../../../lib/types";
import { Button } from "../../../../components/ui/PrimaryButton";
import { useCreateHealthStat } from "../../../../hooks/useHealthStats";

type AddHealthStatProps = {
	patient: PatientDetailsVm;
};

export const AddHealthStat = ({ patient }: AddHealthStatProps) => {
	const [open, setOpen] = useState(false);
	const createMutation = useCreateHealthStat(patient.id);

	const healthStatTypes = [
		{ value: "BloodPressure" as const, label: "Blood Pressure", unit: "mmHg" },
		{ value: "Glucose" as const, label: "Glucose", unit: "mg/dL" },
		{ value: "Cholesterol" as const, label: "Cholesterol", unit: "mg/dL" },
		{ value: "HeartRate" as const, label: "Heart Rate", unit: "bpm" },
		{ value: "Weight" as const, label: "Weight", unit: "lbs" }
	];

	const statusOptions = ["Normal", "Warning", "Critical"] as const;

	const [date, setDate] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [value, setValue] = useState<string>("");
	const [unit, setUnit] = useState<string>("");
	const [status, setStatus] = useState<string>("");

	const resetForm = () => {
		setDate("");
		setType("");
		setValue("");
		setUnit("");
		setStatus("");
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

		createMutation.mutate(
			{ type, value, unit, status },
			{
				onSuccess: () => {
					resetForm();
					setOpen(false);
				},
				onError: () => {
					alert("Failed to create health stat. Please try again.");
				}
			}
		);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} variant={"outline"}>
				<Plus className="w-4 h-4" /> New Health Stat
			</Button>

			<DialogModal title="Add Health Stat" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 ">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
						<Activity />
					</div>
					<div>
						<p className="text-sm  text-muted-foreground">Create health stat for</p>
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
											{s}
										</option>
									))}
								</select>
							</div>
						</div>

						<Button type="submit" disabled={createMutation.isPending}>
							{createMutation.isPending ? "Adding..." : "Add Health Stat"}
						</Button>
					</div>
				</form>
			</DialogModal>
		</>
	);
};
