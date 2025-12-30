import { User, MessageSquare, MailOpen } from "lucide-react";
import { useState, type FormEvent } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { mockMessages, type Message } from "../../../lib/api/mockData";
import { mockPatients } from "../../../lib/api/mockData";
import { format } from "date-fns";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";

const getMessagesForAdmin = (): Message[] => {
	return mockMessages.filter(m => m.fromPatient);
};

/* Unused code was commented out to fix lint errors. No unused code in dev.
const getUnreadMessagesForAdmin = (): Message[] => {
	return mockMessages.filter(m => m.fromPatient && !m.read);
};

const getUnreadAdminCount = (): number => {
	return getUnreadMessagesForAdmin().length;
};
*/

export default function AdminMessagesPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selected, setSelected] = useState<Message | null>(null);

	const [patientInput, setPatientInput] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [messages, setMessages] = useState<Message[]>(getMessagesForAdmin());

	const [toastVisible, setToastVisible] = useState(false);

	const markAsReadByAdmin = (id: string) => {
		setMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
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
		setIsOpen(false);

		setToastVisible(true);

		setTimeout(() => {
			setToastVisible(false);
		}, 1500);
	};

	const unreadCount = messages.filter(m => !m.read).length;

	return (
		<div>
			{toastVisible && (
				<div
					className="flex items-center w-full max-w-sm p-4 text-body rounded-md shadow-lg fixed bottom-4 left-1/2 transform -translate-x-1/2"
					role="alert"
				>
					<div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-white bg-green-300 rounded">
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 11.917 9.724 16.5 19 7.5"
							/>
						</svg>
						<span className="sr-only">Check icon</span>
					</div>
					<div className="ms-3 text-sm font-normal">Message sent successfully!</div>
					<button
						type="button"
						className="ms-auto flex items-center justify-center text-white hover:text-heading bg-transparent box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
						aria-label="Close"
						onClick={() => setToastVisible(false)}
					>
						<span className="sr-only">Close</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18 17.94 6M18 18 6.06 6"
							/>
						</svg>
					</button>
				</div>
			)}

			<div className="flex items-center justify-between">
				<PageHeader title="Messages" description={`You have ${unreadCount} unread message(s)`} />

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

				<DialogModal open={isOpen} onOpenChange={setIsOpen} title="New Message" buttonText="+ New Message" showTrigger>
					<form onSubmit={handleSubmit}>
						<div className="p-1 m-1">
							<label htmlFor="patient" className="block p-1 text-md font-semibold">
								Patient
							</label>
							<select
								id="patient"
								value={patientInput}
								onChange={e => setPatientInput(e.target.value)}
								required
								className="focus:ring-2 focus:outline-none focus:ring-primary focus:ring-offset-1 border border-foreground/20 rounded-md p-1 w-full"
							>
								<option value="" disabled>
									Choose a patient
								</option>
								{mockPatients.map(patient => (
									<option key={patient.id} value={patient.id}>
										{patient.name}
									</option>
								))}
							</select>
						</div>

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
						{messages
							?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
							.map(message => (
								<Card
									key={message.id}
									className={`mb-4 cursor-pointer ${selected?.id === message.id ? "border-2 border-primary" : ""}`}
									onClick={() => handleCardClick(message)}
								>
									<CardContent className="p-4">
										<div className="flex items-start gap-3">
											<div className={message.read ? "p-2 rounded-full bg-muted" : "p-2 rounded-full bg-gray-200"}>
												{message.read ? (
													<MailOpen className="h-4 w-4 text-muted-foreground" />
												) : (
													<MailOpen className="h-4 w-4 text-primary" />
												)}
											</div>

											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between gap-2 mb-1">
													<span
														className={
															message.read ? "text-muted-foreground" : "text-foreground font-medium truncate"
														}
													>
														{message.patientName}
													</span>
													{!message.read && <Pill variant="secondary">New</Pill>}
												</div>
												<p
													className={
														message.read ? "text-muted-foreground" : "text-foreground font-medium truncate mb-1"
													}
												>
													{message.subject}
												</p>
												<p className="text-xs text-muted-foreground">
													{format(new Date(message.date), "MMM d, h:mm a")}
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
										Reply to {selected.patientName.split(" ")[0]}
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
