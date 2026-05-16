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
                dayName: string,
                isHaveEvent: boolean
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
            dayName: string,
            isHaveEvent: boolean
        };
    }[],
    currentYear: number,
    isScroll: boolean,
    isAllowScrollEventModalContent: boolean,
    isEnableAlert: boolean,
    currentScrollEventModalContentPos: number,
    currentSelectDate: string,
    currentSelectDateInAllEventList: string,
    highlightDate: string,
    toggleEventsListStatus: boolean,
    toggleSingleEventsModalStatus: boolean,
    currentSingleEventsModalView: 'list' | 'else'
    eventsListResult: {
        type: string,
        id: number,
        title: string,
        desc: string,
        isEnableAlert: boolean,
        isNotic: boolean,
        eventDate: string,
        eventAlertTime: number,
        createTime: string,
        updateTime: string
    }[],
    filterEventsListResult: InitStateType['eventsListResult']
    eventsModalMode: 'add' | 'edit',
    eventTitle: string,
    eventContent: string,
    eventTime: { h: string, m: string, s: string },
    eventUpdateItem: InitStateType['eventsListResult'][0] | undefined,
    deleteEventId: number,
    toggleDeleteEventLayoutStatus: boolean
    toggleDeleteEventAllListLayoutStatus: boolean
}