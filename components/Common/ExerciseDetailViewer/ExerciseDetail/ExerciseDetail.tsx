import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal, Text, View } from "react-native";

import EditExerciseForm from "@/components/Forms/EditExercise/EditExerciseForm";
import { getExercise } from "@/db/queries";

import ExerciseAnalytics from "./ExerciseAnalytics";
import ExerciseDescription from "./ExerciseDescription";
import ExerciseHistory from "./ExerciseHistory/ExerciseHistory";
import { styles } from "./styles";
import { ActiveTab, ExerciseDetailProps } from "./types";
import TabNavigator from "./utils/TabNavigator/TabNavigator";

export default function ExerciseDetail({
    id,
    showDetails,
    closeDetails,
    showForm,
    openForm,
    closeForm,
}: ExerciseDetailProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("Description");
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises", id],
        queryFn: () => getExercise(id),
    });

    let form;
    if (isPending) {
        form = <Text>Loading</Text>;
    } else if (isError) {
        form = <Text>{error.message}</Text>;
    } else {
        form = (
            <EditExerciseForm
                showForm={showForm}
                closeForm={closeForm}
                exercise={data[0]}
            />
        );
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showDetails}
            >
                <View style={styles.transparentBackground}>
                    <View style={styles.detailsBackground}>
                        <View style={styles.detailsHeader}>
                            <Button title="Exit" onPress={closeDetails} />
                            <Text style={styles.detailsHeaderText}>
                                {data?.length === 1 ? data[0].name : "Exercise"}
                                Details
                            </Text>
                            <Button title="Edit" onPress={openForm} />
                        </View>
                        <View style={styles.navigator}>
                            <TabNavigator
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </View>

                        {activeTab === "Analytics" && <ExerciseAnalytics />}
                        {activeTab === "History" && <ExerciseHistory id={id} />}
                        {activeTab === "Description" && (
                            <ExerciseDescription
                                exercise={
                                    data?.length === 1 ? data[0] : undefined
                                }
                            />
                        )}
                    </View>
                </View>
            </Modal>
            {data?.length === 1 && (
                <EditExerciseForm
                    showForm={showForm}
                    closeForm={closeForm}
                    exercise={data[0]}
                />
            )}
        </>
    );
}
