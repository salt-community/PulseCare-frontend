import { User } from "lucide-react";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { mockMessages } from "../../../lib/api/mockData";
import { format } from "date-fns";
import { Button } from "../../../components/ui/PrimaryButton";

export default function AdminMessagesPage() {
	const data = mockMessages;
	console.log("mock data---", data);
	return (
		<div>
			<div className="flex items-center justify-between">
				<PageHeader title="Messages" description="send message to your health care" />
				<Button> + New Message</Button>
			</div>
			{data.length === 0 ? (
				<Card className="mb-4">
					<CardContent className="flex flex-col items-center justify-center py-12 ">
						<p className="text-lg font-medium text-foreground mb-2">No messages yet</p>
					</CardContent>
				</Card>
			) : (
				data.map(d => (
					<Card key={d.id} className="mb-4">
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
								<div>
									{!d.read && (
										<Pill className="bg-primary/10 text-primary" variant="secondary">
											sent
										</Pill>
									)}
								</div>
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
