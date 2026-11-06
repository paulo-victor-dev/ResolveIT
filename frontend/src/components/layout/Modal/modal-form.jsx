"use client";

import { cn } from "cn";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Form from "@/components/layout/Form";

export default function ModalForm({ config, onClose }) {
    const { 
        isOpen, 
        title, 
        action,
        typeData: { data, formData }
    } = config;

    const { execute, isLoading } = action;

    const handleSubmit = async (values, form) => {
        try {
            await execute(values);
            onClose(); 

        } catch (error) {
            form.setError("root", {
                message: error.message,
            });
        }
    };

    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className={cn(
                "max-h-[calc()]"
            )}>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-scroll px-2 max-h-[calc(100dvh-5rem)]">
                    <Form
                        id={"modal-form"}
                        fieldsList={formData.dataFields}
                        fieldsSchema={formData.formSchema}
                        defaultValues={data}
                        onSubmit={handleSubmit}
                    />
                </div>

                <DialogFooter>
                    <DialogClose render={
                        <Button 
                            variant="outline"
                            disabled={isLoading}    
                        >
                            Cancelar
                        </Button>
                    } />

                    <Button 
                        type="submit"
                        form="modal-form"
                        disabled={isLoading}
                    >
                        Salvar alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
