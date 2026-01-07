import { Pill, Plus } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import type { Patient } from "../../../../lib/api/mockData";
import { Button } from "../../../../components/ui/PrimaryButton";
import type { CreateMedicationDto } from "../../../../lib/types/medication";

type PrescriptionProps = {
	patient: Patient;
	onSubmit: (dto: CreateMedicationDto) => void;
};

export const AddPrescriptionForm = ({ patient, onSubmit }: PrescriptionProps) => {
	const [open, setOpen] = useState(false);

	const dosageUnits = ["mg", "mcg", "g", "Tablet", "Capsule", "mL", "L", "IU", "U"];
	const medicineTypes = ["Metformin", "Lisinopril", "Atorvastatin", "Vitamin D3"];
	const frequencyUnits = ["Day", "Week", "Month"];

	const [date, setDate] = useState<string>("");
	const [expireDate, setExpireDate] = useState<string>("");
	const [medicine, setMedicine] = useState<string>("");
	const [doseValue, setDoseValue] = useState<number>(0);
	const [doseUnit, setDoseUnit] = useState<string>("");
	const [frequencyValue, setFrequencyValue] = useState<number>(1);
	const [frequencyUnit, setFrequencyUnit] = useState<string>("day");
	const [instructions, setInstructions] = useState<string>("");

	const resetForm = () => {
		setDate("");
		setExpireDate("");
		setMedicine("");
		setDoseValue(0);
		setDoseUnit("");
		setFrequencyUnit("Day");
		setFrequencyValue(1);
		setInstructions("");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const dto: CreateMedicationDto = {
			name: medicine,
			dosage: `${doseValue} ${doseUnit}`,
			frequency: `${frequencyValue} per ${frequencyUnit}`,
			instructions,
			timesPerDay: frequencyValue,
			startDate: date,
			endDate: expireDate || null
		};

		onSubmit(dto);

		resetForm();
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} variant={"outline"}>
				<Plus className="w-4 h-4" /> New Prescription
			</Button>

			<DialogModal title="Add prescription" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 ">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
						<Pill />
					</div>
					<div>
						<p className="text-sm  text-muted-foreground">Create prescription for</p>
						<p className="text-lg font-semibold text-foreground">{patient.name}</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5 pb-20 md:pb-0">
					<div className="flex flex-col">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<DialogInput type="date" label="From" value={date} onChange={setDate} required className="w-50" />
							<DialogInput type="date" label="To" value={expireDate} onChange={setExpireDate} required className="w-50" />
						</div>
						<div className="grid grid-cols-1 gap-3 items-end p-2 w-full">
							<div className="pe-4">
								<label className="block p-1 text-md font-semibold">Medicine</label>
								<select
									className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
									value={medicine}
									onChange={e => setMedicine(e.target.value)}
									required
								>
									<option value="" disabled>
										Select medicine
									</option>
									{medicineTypes.map((t, i) => (
										<option key={i} value={t}>
											{t}
										</option>
									))}
								</select>
							</div>

							<div className="flex flex-col gap-3">
								<div className="grid grid-cols-1 gap-3 md:grid-cols-[30%_40%]">
									<div>
										<label className="block p-1 text-md font-semibold">Dose</label>
										<input
											type="number"
											min={1}
											className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
											value={doseValue}
											onChange={e => setDoseValue(Number(e.target.value))}
											required
										/>
									</div>

									<div>
										<label className="block p-1 text-md font-semibold invisible">Unit</label>
										<select
											className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
											value={doseUnit}
											onChange={e => setDoseUnit(e.target.value)}
											required
										>
											<option value="" disabled>
												Unit
											</option>
											{dosageUnits.map((u, i) => (
												<option key={i} value={u}>
													{u}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className="grid grid-cols-1 gap-3 md:grid-cols-[30%_40%]">
									<div>
										<label className="block p-1 text-md font-semibold">Times</label>
										<input
											type="number"
											min={1}
											className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
											value={frequencyValue}
											onChange={e => setFrequencyValue(Number(e.target.value))}
											required
										/>
									</div>

									<div>
										<label className="block p-1 text-md font-semibold invisible">Per</label>
										<select
											className="focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
											value={frequencyUnit}
											onChange={e => setFrequencyUnit(e.target.value)}
											required
										>
											{frequencyUnits.map((f, i) => (
												<option key={i} value={f}>
													per {f}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>
						<DialogInput
							type="textarea"
							label="Instructions"
							value={instructions}
							onChange={setInstructions}
							rows={3}
							placeholder="Instructions for the patient"
							required={false}
						/>

						<Button type="submit">Add prescription</Button>
					</div>
				</form>
			</DialogModal>
		</>
	);
};
