import CalendarNavigationComponent from './CalendarNavigationComponent';

const CalendarComponent = ({
    selectedDates,
    activeTab,
    onDateSelect,
    currentMonth,
    onMonthChange,
    onYearChange,
}) => {
    const [fromDate, toDate] = selectedDates;

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const getWeekDays = (date) => {
        const week = [];
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());

        for (let i = 0; i < 7; i++) {
            week.push(new Date(start));
            start.setDate(start.getDate() + 1);
        }
        return week;
    };

    const getAllWeeksInMonth = () => {
        const weeks = [];
        const firstDay = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth(), 1);
        const lastDay = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() + 1, 0);

        // Get the first Sunday to start (might be from previous month)
        const firstSunday = new Date(firstDay);
        firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

        // Generate all weeks
        let currentDate = firstSunday;
        while (currentDate <= lastDay) {
            weeks.push(getWeekDays(currentDate));
            currentDate.setDate(currentDate.getDate() + 7);
        }
        return weeks;
    };

    const handleDateClick = (date) => {
        if (activeTab === 'weeks') {
            const weekDays = getWeekDays(date);
            const firstDay = weekDays[0];
            const lastDay = weekDays[6];
            onDateSelect([firstDay, lastDay]);
        } else {
            if (!fromDate || (fromDate && toDate)) {
                //console.log('1--');
                // Start new selection
                onDateSelect([date, null]);
            } else {
                // console.log('2--');
                // Complete the selection
                if (date < fromDate) {
                    onDateSelect([date, fromDate]);
                } else {
                    onDateSelect([fromDate, date]);
                }
            }
        }
    };

    const isDateInRange = (date) => {
        if (!fromDate || !toDate) return false;
        return date >= fromDate && date <= toDate;
    };

    const isDateSelected = (date) => {
        if (!date || !fromDate) return false;

        if (activeTab === 'weeks') {
            const weekDays = getWeekDays(date);
            return weekDays.some(day =>
                day.getDate() === fromDate.getDate() &&
                day.getMonth() === fromDate.getMonth() &&
                day.getFullYear() === fromDate.getFullYear()
            );
        }

        return (
            (fromDate && date.getTime() === fromDate.getTime()) ||
            (toDate && date.getTime() === toDate.getTime()) ||
            isDateInRange(date)
        );
    };

    const handleNavigate = (direction) => {
        const newDate = new Date(currentMonth);
        if (direction === 'next') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        onMonthChange(newDate);
    };
    const weeks = getAllWeeksInMonth();


    return (
        <div className="calendar">
            <CalendarNavigationComponent
                currentYear={currentMonth?.getFullYear()}
                currentMonth={currentMonth}
                onYearChange={onYearChange}
                onNavigate={handleNavigate}
            />
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-header">{day}</div>
                ))}

                {
                    weeks.map((week, weekIndex) => (
                        <div
                            key={weekIndex}
                            className={`calendar-week-row `}
                        >
                            {
                                week.map((date, dayIndex) => (
                                    <button
                                        key={dayIndex}
                                        className={`calendar-day 
                                            ${date.getMonth() !== currentMonth.getMonth() ? 'other-month' : ''}
                                            ${isDateSelected(date) ? 'selected' : ''}
                                            ${date.getTime() === fromDate?.getTime() ? 'range-start' : ''}
                                            ${date.getTime() === toDate?.getTime() ? 'range-end' : ''}
                                        `}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        {date.getDate()}
                                    </button>
                                ))}
                        </div>
                    ))}
            </div>
        </div >
    );
};

export default CalendarComponent;