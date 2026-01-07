import { Pencil, Pill } from "lucide-react";
import { DialogModal } from "../../../../components/shared/DialogModal";
import { Button } from "../../../../components/ui/PrimaryButton";
import { DialogInput } from "../../../../components/ui/DialogInput";
import { useState, type FormEvent } from "react";
import type { Medication, UpdateMedicationDto } from "../../../../lib/types";
import type { Patient } from "../../../../lib/types/patients";

type RenewPrescriptionProps = {
	patient: Patient;
	prescription: Medication;
	onSubmit: (dto: UpdateMedicationDto) => void;
};

export const EditPrescriptionForm = ({ patient, prescription, onSubmit }: RenewPrescriptionProps) => {
	const toDateInputValue = (isoString: string | null | undefined) => {
		if (!isoString) return "";
		return isoString.split("T")[0];
	};
	const [open, setOpen] = useState(false);

	const dosageUnits = ["mg", "mcg", "g", "Tablet", "Capsule", "mL", "L", "IU", "U"];
	const medicineTypes = ["Metformin", "Lisinopril", "Atorvastatin", "Vitamin D3"];
	const frequencyUnits = ["Day", "Week", "Month"];

	//TODO: Skapa en ny dto för admin recept överblick
	const [date, setDate] = useState(toDateInputValue(prescription.startDate));
	const [expireDate, setExpireDate] = useState(toDateInputValue(prescription.endDate));
	const [medicine, setMedicine] = useState<string>(prescription.name);
	const dosageParts = prescription.dosage.split(" ");
	const [doseValue, setDoseValue] = useState(Number(dosageParts[0]));
	const [doseUnit, setDoseUnit] = useState(dosageParts[1] || "");
	const frequencyParts = prescription.frequency.split(" ");
	const [frequencyValue, setFrequencyValue] = useState(Number(frequencyParts[0]));
	const [frequencyUnit, setFrequencyUnit] = useState(frequencyParts[2] || "Day");
	const [instructions, setInstructions] = useState<string>(prescription.instructions ?? "");

	const resetForm = () => {
		setDate("");
		setExpireDate("");
		setMedicine("");
		setDoseValue(0);
		setDoseUnit("");
		setFrequencyUnit("Day");
		setFrequencyValue(1);
		setInstructions("Instructions: ");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const dto: UpdateMedicationDto = {
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
			<Button variant={"outline"} size={"icon"} className="[&_svg]:size-5" onClick={() => setOpen(true)}>
				<Pencil className="m-0 p-0" />
			</Button>

			<DialogModal title="Edit prescription" onOpenChange={setOpen} open={open}>
				<div className="my-4 flex items-center gap-3 ">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
						<Pill />
					</div>
					<div>
						<p className="text-sm  text-muted-foreground">Edit prescription for</p>
						<p className="text-lg font-semibold text-foreground">{patient.name}</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
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

						<Button type="submit">Save prescription</Button>
					</div>
				</form>
			</DialogModal>
		</>
	);
};
