import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { AnimatedStyle } from 'react-native-reanimated';
import { ReactNode } from "react";
import { Href } from 'expo-router';

export interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    height: number;
    offset: AnimatedStyle;
}

export interface TabProps {
    name: string;
    icon: ReactNode;
    href: Href;
    color: string;
}