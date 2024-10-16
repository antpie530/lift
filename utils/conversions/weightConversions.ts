import { WeightUnits } from "@/types/commonTypes";

export function poundsToGrams(lbs: number): number {
    return Math.round(lbs * 453.59237);
}

export function gramsToPounds(grams: number) {
    return Math.round(grams / 453.59237);
}

function kgToGrams(kg: number): number {
    return Math.round(kg * 1000);
}

function ozToGrams(oz: number): number {
    return Math.round(oz * 28.34952);
}

export default function convertWeightToGrams(value: number, weight: WeightUnits) {
    switch (weight) {
        case "g":
            return Math.round(value);
        case "kg":
            return kgToGrams(value);
        case "lbs":
            return poundsToGrams(value);
        case "oz":
            return ozToGrams(value);
    }
}