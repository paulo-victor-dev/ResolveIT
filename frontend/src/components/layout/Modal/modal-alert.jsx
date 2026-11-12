"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/ui/spinner";

export default function ModalAlert({ config, onClose }) {
    const { 
        isOpen,
        title,
        action
    } = config;
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            await action();
            onClose();

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        };
    };

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Realmente deseja executar essa ação? Ela não poderá ser desfeita depois.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction 
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        Deletar
                        {isLoading && <Spinner />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
