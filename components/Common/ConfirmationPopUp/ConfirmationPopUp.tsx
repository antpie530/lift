import { Modal, Text, TouchableOpacity, View } from "react-native";

import ConfirmationHeader from "./confirmationHeader";
import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { ConfirmationPopUpProps } from "./types";

export default function ConfirmationPopUp({ header, description, showConfirmation, closeConfirmation, onConfirm }: ConfirmationPopUpProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showConfirmation}
        >
            <View style={styles.modalBackground}>
                <View style={styles.popup}>
                    <ConfirmationHeader closeConfirmation={closeConfirmation} header={header} />
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>{description}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                lightHaptic();
                                onConfirm();
                            }}
                            style={styles.confirmButton}
                        >
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}