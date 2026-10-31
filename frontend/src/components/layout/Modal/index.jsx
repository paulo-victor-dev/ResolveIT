import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function Modal({ openState, modalConfig }) {
    const { modalIsOpen, setModalIsOpen } = openState;
    const { modalTitle, action, data } = modalConfig;
    
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={setIsOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {modalTitle}
                    </DialogTitle>
                </DialogHeader>

                <>
                    Form Aqui!
                </>

                <DialogFooter>
                    <DialogClose render={
                        <Button variant="outline">
                            Cancelar
                        </Button>
                    } />


                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
