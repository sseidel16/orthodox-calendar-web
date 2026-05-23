// Mirror of the CalendarData types from auto-calendar

export type CalendarData = {
    year: string;
    months: MonthData[];
};

export type MonthData = {
    name: string[];
    grid: GridData;
};

export type GridData = BoxData[][];

export type BoxData = EmptyBox | NoteBox | SplitBox | DateBox;

export type EmptyBox = { type: 'EMPTY' };

export type NoteBox = {
    type: 'NOTE';
    note: string;
    text: string[];
};

export type SplitBox = {
    type: 'SPLIT';
    top: DateBox;
    bottom: DateBox;
};

export type DateBox = {
    type: 'DATE';
    newDate: number;
    oldDate: number;
    background: 'STANDARD' | 'FASTING';
    moon: 'NONE' | 'NEW' | 'FIRST' | 'FULL' | 'LAST';
    fasting: 'NONE' | 'DAIRY' | 'FISH' | 'OIL' | 'STRICT';
    note?: string;
    newFeast: boolean;
    oldFeast: boolean;
    mainText: {
        feast?: string[];
        saint?: string[];
        note?: string[];
    };
    lowerText: {
        tone?: string;
        readings: string[];
    };
};
