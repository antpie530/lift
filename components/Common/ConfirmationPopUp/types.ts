export interface ConfirmationHeaderProps {
    header: string;
    closeConfirmation: () => void;
}

export interface ConfirmationPopUpProps {
    header: string;
    description: string;
    showConfirmation: boolean;
    closeConfirmation: () => void;
    onConfirm: () => void;
}