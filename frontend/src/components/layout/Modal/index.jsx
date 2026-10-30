import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Modal({ openState, data, onEdit, onDelete }) {
    const { modalIsOpen, setModalIsOpen } = openState;

    return (
        <Dialog>
            <DialogTrigger render={trigger} />
        </Dialog>
    );
}
