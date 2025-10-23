export interface InitStateType {
    monthDays: {
        monthName: string;
        weekdays: string[];
        days: {
            month: number,
            day: number;
            dayType: {
                prevMonth: boolean;
                currentMonth: boolean;
                nextMonth: boolean;
                isHoliday: boolean
                dayName: string
            };
        }[]
    }[]
    holidays: {
        month: number,
        day: number;
        dayType: {
            prevMonth: boolean;
            currentMonth: boolean;
            nextMonth: boolean;
            isHoliday: boolean
            dayName: string
        };
    }[],
    currentYear: number,
    isScroll: boolean,
    currentSelectDate: string
}