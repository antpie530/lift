import * as Haptics from "expo-haptics";

export const lightHaptic = () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const mediumHaptic = () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

export const heavyHaptic = () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

export const errorHaptic = () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
