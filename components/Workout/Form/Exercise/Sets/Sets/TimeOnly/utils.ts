import { TimeUnits } from "@/app/(tabs)/_layout";

export const MMSSMask = [/\d/, /\d/, ":", /\d/, /\d/];

export const HHMMSSMask = [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/];

export const MMSSSSMask = [/\d/, /\d/, ":", /\d/, /\d/, ".", /\d/, /\d/];

function msToSeconds(ms: number) {
    return ms / 1000;
}

function secondsToMs(seconds: number) {
    return seconds * 1000;
}

function msToMinutes(ms: number) {
    return ms / 60000;
}

function minutesToMs(minutes: number) {
    return minutes * 60000;
}

function msToHours(ms: number) {
    return ms / 3600000;
}

function hoursToMs(hours: number) {
    return hours * 3600000;
}

function msToMMSS(ms: number) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function MMSSToMs(mmss: string): number {
    if (!mmss) return 0;

    const parts = mmss.split(':');
    if (parts.length === 1) {
        const seconds = Number(parts[0]);
        return seconds * 1000;
    } else {
        const [minutes, seconds] = parts.map(Number);
        return (minutes * 60000) + (seconds * 1000);
    }
}

function msToHHMM(ms: number): string {
    const hours = Math.floor(ms / 3600000).toString().padStart(2, '0')
    const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function hhmmToMs(hhmm: string): number {
    if (!hhmm) return 0;
    const parts = hhmm.split(':');
    if (parts.length === 1) {
        const minutes = Number(parts[0]);
        return minutes * 60000;
    } else {
        const [hours, minutes] = parts.map(Number);
        return (hours * 3600000) + (minutes * 60000);
    }
}

function msToHHMMSS(ms: number): string {
    const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function hhmmssToMs(hhmmss: string): number {
    if (!hhmmss) return 0;
    const parts = hhmmss.split(':');
    if (parts.length === 1) {
        const seconds = Number(parts[0]);
        return seconds * 1000;
    } else if (parts.length === 2) {
        const [minutes, seconds] = parts.map(Number);
        return (minutes * 60000) + (seconds * 1000);
    } else {
        const [hours, minutes, seconds] = parts.map(Number);
        return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    }
}
  
function msToMMSSSS(ms: number): string {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const hundredths = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${hundredths}`;
}


export function updateFormat(value: string, from: TimeUnits, to: TimeUnits) {
    let newValue;
    let ms;

    switch (from) {
        case "seconds":
            ms = secondsToMs(Number(value));
            break;
        case "minutes":
            ms = minutesToMs(Number(value));
            break;
        case "hours":
            ms = hoursToMs(Number(value));
            break;
        case "MM:SS":
            ms = MMSSToMs(value);
            break;
        case "HH:MM":
            ms = hhmmToMs(value);
            break;
        case "HH:MM:SS":
            ms = hhmmssToMs(value);
        case "MM:SS.SS":
            ms = MMSSToMs(value);
            break;
        default:
            ms = 0;
            break;
    }

    console.log(ms);

    switch (to) {
        case "seconds":
            newValue = msToSeconds(ms);
            break;
        case "minutes":
            newValue = msToMinutes(ms);
            break;
        case "hours":
            newValue = msToHours(ms);
            break;
        case "MM:SS":
            newValue = msToMMSS(ms);
            break;
        case "HH:MM":
            newValue = msToHHMM(ms);
            break;
        case "HH:MM:SS":
            newValue = msToHHMMSS(ms);
            break;
        case "MM:SS.SS":
            newValue = msToMMSSSS(ms);
            break;
        default:
            newValue = 0;
            break;
    }

    return newValue.toString();
}