import { User } from "lucide-react";
import { useState, type FormEvent } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { mockMessages, type Message } from "../../../lib/api/mockData";
import { format } from "date-fns";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";

const getMessagesForAdmin = (): Message[] => {
	return mockMessages.filter(m => m.fromPatient);
};

const getUnreadMessagesForAdmin = (): Message[] => {
	return mockMessages.filter(m => m.fromPatient && !m.read);
};

const getUnreadAdminCount = (): number => {
	return getUnreadMessagesForAdmin().length;
};

export default function AdminMessagesPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selected, setSelected] = useState<Message | null>(null);

	const [patientInput, setPatientInput] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [messages, setMessages] = useState<Message[]>(getMessagesForAdmin());

	const markAsReadByAdmin = (id: string) => {
		setMessages(prev =>
			prev.map(m =>
				m.id === id ? { ...m, read: true } : m
			)
		);
	};

	const handleCardClick = (msg: Message) => {
		setSelected(msg);
		setDialogOpen(true);

		if (!msg.read) {
			markAsReadByAdmin(msg.id);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const messageRequest = {
			patient: patientInput,
			subject,
			message
		};

		console.log("Send message:", messageRequest);

		setPatientInput("");
		setSubject("");
		setMessage("");
		setIsOpen(false);
	};

	const unreadCount = messages.filter(m => !m.read).length;

	return (
		<div>
			<div className="flex items-center justify-between">
				<PageHeader
					title="Messages"
					description={`You have ${unreadCount} unread message(s)`}
				/>

				<DialogModal
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					title={selected ? `Reply to ${selected.patientName}` : "Message"}
					showTrigger={false}
				>
					<form onSubmit={handleSubmit}>
						<DialogInput
							type="textarea"
							label="Message"
							placeholder="Type your reply..."
							value={message}
							onChange={setMessage}
							required
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
					showTrigger
				>
					<form onSubmit={handleSubmit}>
						<DialogInput
							type="text"
							label="Patient"
							placeholder="Patient name..."
							value={patientInput}
							onChange={setPatientInput}
							required
						/>
						<DialogInput
							type="text"
							label="Subject"
							placeholder="Subject"
							value={subject}
							onChange={setSubject}
							required
						/>
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

			{messages.length === 0 ? (
				<Card className="mb-4">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<p className="text-lg font-medium">No messages yet</p>
					</CardContent>
				</Card>
			) : (
				messages.map(m => (
					<Card
						key={m.id}
						className={`mb-4 cursor-pointer ${!m.read ? "border-primary bg-primary/5" : ""
							}`}
						onClick={() => handleCardClick(m)}
					>
						<CardContent className="p-5">
							<div className="flex justify-between pb-3">
								<div className="flex gap-3">
									<div className="p-2 rounded-full bg-primary/10 h-8 w-8">
										<User className="h-4 w-4 text-primary" />
									</div>
									<div className="flex flex-col">
										<span className="text-sm font-medium">
											From: {m.patientName}
										</span>
										<span className="text-xs">
											{format(new Date(m.date), "MMM dd, yyyy • HH:mm")}
										</span>
									</div>
								</div>

								{!m.read && <Pill variant="secondary">Unread</Pill>}
							</div>

							<div className="text-m font-semibold mb-2">
								{m.subject}
							</div>
							<div className="text-sm">{m.content}</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	);
}
