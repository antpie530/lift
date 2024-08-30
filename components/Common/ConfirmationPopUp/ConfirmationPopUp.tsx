import { Modal, StyleSheet, Text, View } from "react-native";

import ConfirmationHeader from "./confirmationHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { lightHaptic } from "@/utils/haptics/haptics";

interface ConfirmationPopUpProps {
    header: string;
    description: string;
    showConfirmation: boolean;
    closeConfirmation: () => void;
    onConfirm: () => void;
}

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

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        height: "100%",
        justifyContent: "center",
        width: "100%"
    },
    popup: {
        aspectRatio: 5/4,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        overflow: "hidden",
        width: "95%"
    },
    body: {
        alignItems: "center",
        flex: 1,
    },
    bodyText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        padding: 15
    },
    confirmButton: {
        backgroundColor: "rgba(255, 0, 0, .7)",
        borderRadius: 15,
        padding: 15,
        width: "80%"
    },
    confirmButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    }
})