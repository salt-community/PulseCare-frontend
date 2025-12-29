import { User, MessageSquare } from "lucide-react";
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
		if (!msg.read) {
			markAsReadByAdmin(msg.id);
		}
	};

	const handleReplyClick = () => {
		if (selected) {
			setDialogOpen(true);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const messageRequest = {
			patient: selected?.patientName,
			subject,
			message
		};

		console.log("Send message:", messageRequest);

		setPatientInput("");
		setSubject("");
		setMessage("");
		setDialogOpen(false);
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

			{messages?.length === 0 ? (
				<Card className="shadow-card">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
						<p className="text-lg font-medium text-foreground mb-2">No messages</p>
						<p className="text-muted-foreground">Patient messages will appear here</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6 lg:grid-cols-[400px_1fr]">
					<div className="space-y-2">
						{messages?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((message, index) => (
							<Card
								key={message.id}
								className={`mb-4 cursor-pointer ${!message.read ? "border-primary bg-primary/5" : ""}`}
								onClick={() => handleCardClick(message)}
							>
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className={message.read ? 'p-2 rounded-full bg-muted' : 'p-2 rounded-full bg-primary/10'}>
											{message.read ? (
												<MessageSquare className="h-4 w-4 text-muted-foreground" />
											) : (
												<MessageSquare className="h-4 w-4 text-primary" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between gap-2 mb-1">
												<span className={message.read ? 'text-muted-foreground' : 'text-foreground font-medium truncate'}>
													{message.patientName}
												</span>
												{!message.read && (
													<Pill variant="secondary">New</Pill>
												)}
											</div>
											<p className={message.read ? 'text-muted-foreground' : 'text-foreground font-medium truncate mb-1'}>
												{message.subject}
											</p>
											<p className="text-xs text-muted-foreground">
												{format(new Date(message.date), 'MMM d, h:mm a')}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<Card className="shadow-card h-fit lg:sticky lg:top-20">
						{selected ? (
							<CardContent className="p-6">
								<div className="mb-6 pb-6 border-b border-border">
									<div className="flex items-center gap-3 mb-4">
										<div className="p-3 rounded-full bg-primary/10">
											<User className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="font-semibold text-foreground">{selected.patientName}</p>
											<div className="flex items-center gap-1 text-sm text-muted-foreground">
												<MessageSquare className="h-3.5 w-3.5" />
												{format(new Date(selected.date), "MMMM dd, yyyy • hh:mm a")}
											</div>
										</div>
									</div>
									<h2 className="text-xl font-semibold text-foreground">{selected.subject}</h2>
								</div>
								<div className="prose prose-sm max-w-none">
									<p className="text-foreground whitespace-pre-wrap">{selected.content}</p>
								</div>
								<div className="mt-6 pt-6 border-t border-border">
									<Button className="w-full sm:w-auto" onClick={handleReplyClick}>
										Reply to {selected.patientName.split(' ')[0]}
									</Button>
								</div>
							</CardContent>
						) : (
							<CardContent className="flex flex-col items-center justify-center py-16">
								<MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
								<p className="text-muted-foreground">Select a message to view</p>
							</CardContent>
						)}
					</Card>
				</div>
			)}
		</div>
	);
}
