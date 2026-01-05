import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "../ui/PrimaryButton";

type DialogModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	children: React.ReactNode;
	title: string;
	description?: string;

	trigger?: React.ReactNode;
	buttonText?: string;
	showTrigger?: boolean;
};

export function DialogModal({
	open,
	onOpenChange,
	children,
	title,
	description,
	trigger,
	buttonText = "Open",
	showTrigger = false
}: DialogModalProps) {
	const shouldRenderTrigger = showTrigger || !!trigger;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			{shouldRenderTrigger && <Dialog.Trigger asChild>{trigger ?? <Button type="button">{buttonText}</Button>}</Dialog.Trigger>}
			<Dialog.Portal>
				<Dialog.Overlay className="fixed left-0 right-0 bottom-0 bg-black/50 top-19.25" />
				<Dialog.Content
					onOpenAutoFocus={e => e.preventDefault()}
					className="fixed left-1/2 top-[calc((100vh-19.25*0.25rem)/2+19.25*0.25rem)] -translate-x-1/2 -translate-y-13/25 w-[min(95%,32rem)] max-h-[calc(100vh-19.25*0.25rem-1rem)] bg-background-secondary rounded-2xl p-4 z-50 flex flex-col"
				>
					<Dialog.Title className="text-foreground font-semibold text-xl text-center">{title}</Dialog.Title>
					{description && <Dialog.Description className="text-foreground">{description}</Dialog.Description>}
					{children}
					<Dialog.Close asChild>
						<button
							type="button"
							className="absolute text-foreground/60 top-3 right-3 hover:text-foreground rounded-sm cursor-pointer"
						>
							<X className="size-5 m-1" />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
