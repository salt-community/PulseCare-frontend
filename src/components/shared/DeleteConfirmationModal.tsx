import { Button } from "../ui/PrimaryButton";
import { DialogModal } from "./DialogModal";

type DeleteConfirmationProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	medicationName: string;
};

export const DeleteConfirmationModal = ({ open, onOpenChange, onConfirm, medicationName }: DeleteConfirmationProps) => {
	return (
		<DialogModal title="Delete prescription" open={open} onOpenChange={onOpenChange}>
			<p className="text-sm text-muted-foreground mt-4 mb-6">
				Are you sure you want to delete <strong>{medicationName}</strong>? <br />
				This action cannot be undone.
			</p>

			<div className="flex justify-end gap-3">
				<Button variant="default" onClick={() => onOpenChange(false)}>
					Cancel
				</Button>

				<Button variant="destructive" onClick={onConfirm}>
					Delete
				</Button>
			</div>
		</DialogModal>
	);
};
