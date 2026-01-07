import { useEffect, useRef, useState } from "react";
import { Mail, MailOpen, Plus, User } from "lucide-react";
import { format } from "date-fns";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { DialogModal } from "../../../components/shared/DialogModal";
import { DialogInput } from "../../../components/ui/DialogInput";
import { Button } from "../../../components/ui/PrimaryButton";
import { SelectInput } from "../../../components/ui/SelectInput";
import { mockPatients } from "../../../lib/api/mockData";
import { useConversations } from "../../../hooks/useConversations";
import { useChat } from "../../../hooks/useChat";
import type { Conversation, Message } from "../../../lib/types/conversation";

const CURRENT_DOCTOR_ID = "067fa0de-2b36-4368-a491-604a73454c23";

export default function AdminMessagesPage() {
	const { conversations, unreadCount, startConversation, isLoading } = useConversations({
		role: "doctor",
		userId: CURRENT_DOCTOR_ID
	});
	const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
	const chat = useChat(selectedConvId ?? "", CURRENT_DOCTOR_ID, "doctor");
	const [replyText, setReplyText] = useState("");
	const [isThreadOpen, setIsThreadOpen] = useState(false);
	const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
	const [newMessagePatientId, setNewMessagePatientId] = useState("");
	const [newMessageSubject, setNewMessageSubject] = useState("");
	const [newMessageContent, setNewMessageContent] = useState("");

	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	useEffect(() => {
		if (isThreadOpen) {
			const timer = setTimeout(scrollToBottom, 100);
			return () => clearTimeout(timer);
		}
	}, [chat.messages, isThreadOpen]);

	const openThread = (id: string) => {
		setSelectedConvId(id);
		setIsThreadOpen(true);
		chat.markAsRead();
	};

	const handleNewMessage = (e: React.FormEvent) => {
		e.preventDefault();

		startConversation({
			patientId: newMessagePatientId,
			doctorId: CURRENT_DOCTOR_ID,
			subject: newMessageSubject,
			content: newMessageContent,
			fromPatient: false
		});

		setIsNewMessageOpen(false);
		setNewMessagePatientId("");
		setNewMessageSubject("");
		setNewMessageContent("");
	};

	const handleReply = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedConvId || chat.messages.length === 0) return;

		const last = chat.messages[chat.messages.length - 1];
		const subject = last.subject.startsWith("Re:") ? last.subject : `Re: ${last.subject}`;

		chat.sendMessage({
			subject,
			content: replyText,
			fromPatient: false
		});

		setReplyText("");
	};

	// const getPatientName = (id: string) => mockPatients.find(p => p.id === id)?.name ?? id;
	const getPatientName = (id: string) => mockPatients.find(d => d.id === id)?.name ?? "Patient";
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
						options={mockPatients.map(p => ({
							label: p.name,
							value: p.id
						}))}
						required
					/>

					<DialogInput type="text" label="Subject" value={newMessageSubject} onChange={setNewMessageSubject} required />

					<DialogInput type="textarea" label="Message" value={newMessageContent} onChange={setNewMessageContent} required />

					<Button variant="submit" className="w-full">
						Send
					</Button>
				</form>
			</DialogModal>

			{isLoading ? (
				<Card>
					<CardContent>Loading...</CardContent>
				</Card>
			) : conversations.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center text-muted-foreground">No messages yet</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{conversations.map((conv: Conversation) => {
						const last = conv.latestMessage;
						const hasUnread = conv.unreadCount > 0;

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
												className={`text-sm truncate ${
													hasUnread ? "text-black font-semibold" : "text-muted-foreground"
												}`}
											>
												{last?.subject}
											</p>

											<p className={`text-xs ${hasUnread ? "text-black" : "text-muted-foreground"}`}>
												{last ? format(new Date(last.date), "MMM d, HH:mm") : ""}
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
				onOpenChange={open => {
					setIsThreadOpen(open);
					if (!open) setSelectedConvId(null);
				}}
				title="Conversation"
				showTrigger={false}
			>
				{chat.messages.length > 0 ? (
					<div className="flex flex-col max-h-[75vh] pb-18 md:pb-4">
						<div className="flex items-center gap-3">
							<div className="p-3 rounded-full bg-primary/10">
								<User className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="font-semibold">
									{getPatientName(conversations.find((c: Conversation) => c.id === selectedConvId)?.patientId ?? "")}
								</p>
								<p className="text-sm text-muted-foreground">Conversation</p>
							</div>
						</div>

						<div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 flex-1">
							{chat.messages.map((msg: Message) => {
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
						{chat.isTyping && <p className="text-xs text-muted-foreground italic px-1">Typing...</p>}
						<form onSubmit={handleReply} className="space-y-2">
							<DialogInput
								type="textarea"
								label="Reply"
								placeholder="Type your reply..."
								value={replyText}
								onChange={val => {
									setReplyText(val);
									chat.sendTyping();
								}}
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
