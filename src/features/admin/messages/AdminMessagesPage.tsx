import { useEffect, useRef, useState } from "react";
import { Mail, MailOpen, Plus, User } from "lucide-react";
import { format } from "date-fns";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";
import { useMessages } from "../../../hooks/useMessages";
import { mockPatients } from "../../../lib/api/mockData";
import { SelectInput } from "../../../components/ui/SelectInput";

const CURRENT_DOCTOR_ID = "doctor-1";

export default function AdminMessagesPage() {
	const { conversations, unreadCount, markConversationAsRead, sendMessage } = useMessages({
		role: "doctor",
		doctorId: CURRENT_DOCTOR_ID
	});

	const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
	const [replyText, setReplyText] = useState("");
	const [isThreadOpen, setIsThreadOpen] = useState(false);
	const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
	const [newMessagePatientId, setNewMessagePatientId] = useState("");
	const [newMessageSubject, setNewMessageSubject] = useState("");
	const [newMessageContent, setNewMessageContent] = useState("");
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const handleNewMessage = (e: React.FormEvent) => {
		e.preventDefault();

		sendMessage({
			subject: newMessageSubject,
			content: newMessageContent,
			patientId: newMessagePatientId,
			doctorId: CURRENT_DOCTOR_ID,
			sender: "doctor"
		});

		setIsNewMessageOpen(false);
		setNewMessagePatientId("");
		setNewMessageSubject("");
		setNewMessageContent("");
	};

	const openThread = (id: string) => {
		setSelectedConvId(id);
		setIsThreadOpen(true);
		markConversationAsRead(id);
	};

	const conversation = conversations.find(c => c.id === selectedConvId);
	const latest = conversation?.messages[conversation.messages.length - 1];

	const getPatientName = (id: string) => mockPatients.find(p => p.id === id)?.name ?? id;

	const handleReply = (e: React.FormEvent) => {
		e.preventDefault();
		if (!conversation || !latest) return;

		sendMessage({
			conversationId: conversation.id,
			subject: latest.subject.startsWith("Re:") ? latest.subject : `Re: ${latest.subject}`,
			content: replyText,
			patientId: conversation.patientId,
			doctorId: conversation.doctorId,
			sender: "doctor"
		});

		setReplyText("");
		setIsThreadOpen(false);
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	useEffect(() => {
		if (isThreadOpen) {
			setTimeout(scrollToBottom, 50);
		}
	}, [isThreadOpen, conversation?.messages.length]);

	return (
		<div className="space-y-4">
			<PageHeader title="Messages" description={`You have ${unreadCount} unread message(s)`} />
			<div className="flex justify-end">
				<Button variant="default" className="flex items-center gap-1 px-3 py-1.5 text-sm" onClick={() => setIsNewMessageOpen(true)}>
					<Plus className="h-4 w-4" />
					New Message
				</Button>
			</div>

			<DialogModal open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen} title="New message" showTrigger={false}>
				<form onSubmit={handleNewMessage} className="space-y-4">
					<SelectInput
						label="Select patient"
						value={newMessagePatientId}
						onChange={setNewMessagePatientId}
						options={mockPatients.map(p => ({ label: p.name, value: p.id }))}
						required
					/>

					<DialogInput type="text" label="Subject" value={newMessageSubject} onChange={setNewMessageSubject} required />

					<DialogInput type="textarea" label="Message" value={newMessageContent} onChange={setNewMessageContent} required />

					<Button variant="submit" className="w-full">
						Send
					</Button>
				</form>
			</DialogModal>

			{conversations.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center text-muted-foreground">No messages yet</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{conversations.map(conv => {
						const last = conv.messages[conv.messages.length - 1];

						const hasUnread = conv.messages.some(m => m.fromPatient && !m.read);

						return (
							<Card key={conv.id} className="cursor-pointer" onClick={() => openThread(conv.id)}>
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-full">
											{hasUnread ? (
												<Mail className="h-5 w-5 text-black" />
											) : (
												<MailOpen className="h-5 w-5 text-muted-foreground" />
											)}
										</div>

										<div className="flex-1 min-w-0">
											<div className="flex justify-between items-center">
												<p className={`font-medium truncate ${hasUnread ? "text-black" : "text-muted-foreground"}`}>
													{getPatientName(conv.patientId)}
												</p>
												{hasUnread && <Pill variant="secondary">New</Pill>}
											</div>

											<p
												className={`text-sm truncate ${hasUnread ? "text-black font-semibold" : "text-muted-foreground"}`}
											>
												{last.subject}
											</p>

											<p className={`text-xs ${hasUnread ? "text-black" : "text-muted-foreground"}`}>
												{format(new Date(last.date), "MMM d, HH:mm")}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}

			<DialogModal
				open={isThreadOpen}
				onOpenChange={setIsThreadOpen}
				title={latest ? latest.subject : "Conversation"}
				showTrigger={false}
			>
				{conversation && latest ? (
					<div className="flex flex-col h-[70vh] pb-[env(safe-area-inset-bottom)]">
						<div className="flex items-center gap-3">
							<div className="p-3 rounded-full bg-primary/10">
								<User className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="font-semibold">{getPatientName(conversation.patientId)}</p>
								<p className="text-sm text-muted-foreground">Conversation</p>
							</div>
						</div>

						<div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 flex-1">
							{conversation.messages.map(msg => {
								const isPatient = msg.fromPatient;
								return (
									<div key={msg.id} className={`flex ${isPatient ? "justify-start" : "justify-end"}`}>
										<div
											className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
												isPatient ? "bg-primary text-white" : "bg-card-foreground text-background"
											}`}
										>
											<p className="whitespace-pre-wrap">{msg.content}</p>
											<p className="text-[10px] mt-1 opacity-70 text-right">
												{format(new Date(msg.date), "MMM d, HH:mm")}
											</p>
										</div>
									</div>
								);
							})}
							<div ref={messagesEndRef} />
						</div>

						<form onSubmit={handleReply} className="space-y-2">
							<DialogInput
								type="textarea"
								label="Reply"
								placeholder="Type your reply..."
								value={replyText}
								onChange={setReplyText}
								required
							/>
							<Button variant="submit" className="w-full">
								Send reply
							</Button>
						</form>
					</div>
				) : (
					<div className="py-10 text-center text-muted-foreground">Select a conversation</div>
				)}
			</DialogModal>
		</div>
	);
}
