"use client";

import { useState } from "react";

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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (form) => {
        try {
            setIsLoading(true);

            await action(form.getValues());
            onClose(); 

        } catch (error) {
            form.setError("root", {
                message: error.message,
            });
        } finally {
            setIsLoading(false);
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
                "h-[calc(100dvh-5rem)]"
            )}>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-scroll px-2">
                    <Form
                        id={"modal-form"}
                        formType={formData.formType}
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
