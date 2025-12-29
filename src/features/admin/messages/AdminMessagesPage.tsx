import { User } from "lucide-react";
import { useState, type FormEvent } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { mockMessages } from "../../../lib/api/mockData";
import { format } from "date-fns";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";

export default function AdminMessagesPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<(typeof mockMessages)[0] | null>(null);
	const [doctorInput, setDoctorInput] = useState("");
	const [patientInput, setPatientInput] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	function handleCardClick(message: (typeof mockMessages)[0]) {
		setSelected(message);
		setDialogOpen(true);
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const messageRequest = {
			doctorInput,
			patientInput,
			subject,
			message
		};
		console.log(messageRequest);
		//await messageApi.addMessage(messageRequest)
		setDoctorInput("");
		setSubject("");
		setMessage("");
		setPatientInput("");
		setIsOpen(false);
	};

	const data = mockMessages;
	return (
		<div>
			<div className="flex items-center justify-between">
				<PageHeader title="Messages" description="Send messages to your healthcare providers" />

				<DialogModal
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					title={selected ? `Reply to {Patient Name}` : "Message"}
					showTrigger={false}
				>
					<form onSubmit={handleSubmit}>
						<DialogInput
							type="textarea"
							label="Message"
							placeholder="Type your message here..."
							value={message}
							onChange={setMessage}
							required={true}
						/>
						<Button variant="submit">Send</Button>
					</form>
				</DialogModal>

				<DialogModal
					open={isOpen}
					onOpenChange={setIsOpen}
					title="New Message"
					description="Create a new message to a patient"
					buttonText="+ New Message"
					showTrigger={true}
				>
					<form onSubmit={handleSubmit}>
						<DialogInput
							type="text"
							label="Patient"
							placeholder="add patient name..."
							value={patientInput}
							onChange={setPatientInput}
							required
						/>
						<DialogInput type="text" label="Subject" placeholder="Subject" value={subject} onChange={setSubject} required />
						<DialogInput
							type="textarea"
							label="Message"
							placeholder="Type your message here..."
							value={message}
							onChange={setMessage}
							required
						/>
						<Button variant="submit">Send</Button>
					</form>
				</DialogModal>
			</div>
			{data.length === 0 ? (
				<Card className="mb-4">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No messages yet</p>
					</CardContent>
				</Card>
			) : (
				data.map(d => (
					<Card key={d.id} className="mb-4" onClick={() => handleCardClick(d)}>
						<CardContent className="p-5 ">
							<div className="flex justify-between pb-3">
								<div className="flex flex-row gap-3 ">
									<div className="p-2 rounded-full bg-primary/10 h-8 w-8">
										<User className="h-4 w-4 text-primary" />
									</div>
									<div className="flex flex-col">
										<span className="text-sm text-foreground font-medium ">To:{d.doctorName}</span>
										<span className="text-xs">{format(new Date(d.date), "MMM dd, yyyy  •  HH:mm a")}</span>
									</div>
								</div>
								<div>{!d.read && <Pill variant="secondary">sent</Pill>}</div>
							</div>
							<div className="text-m font-semibold text-foreground mb-2">{d.subject}</div>
							<div className="text-sm">{d.content}</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	);
}
