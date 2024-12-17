import { useState } from 'react';

import TabsComponent from './TabsComponent';
import CalendarComponent from './CalendarComponent';
import MonthsComponent from './MonthsComponent';
import RangeSelection from './RangeSelection.js';

import './DateSelector.css';

const DateRangeSelector = ({
    selectedDates,
    onDateSelect,
    onApply,
    activeTab,
    onTabChange,
    onAsOfDateChange,
    asOfDate
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState('currentMonth');
    const [currentYear, setCurrentYear] = useState(currentMonth?.getFullYear());
    const [customDateRange, setCustomDateRange] = useState({
        start: new Date(),
        end: new Date(new Date().setMonth(new Date().getMonth() + 1, 0))
    });
    const [asOfDateLocal, setAsOfDateLocal] = useState(asOfDate || new Date());


    const handleDateSelection = (dates) => {
        if (Array.isArray(dates)) {
            onDateSelect(dates);
        } else {
            onDateSelect([dates]);
        }
    };

    const handleMonthChange = (newDate) => {
        setCurrentMonth(newDate);
    };

    const handleMonthSelect = (monthIndex) => {
        //console.log('monthIndex--', monthIndex);

        const start = new Date(currentMonth.getFullYear(), monthIndex, 1);
        const end = new Date(currentMonth.getFullYear(), monthIndex + 1, 0);
        onDateSelect([start, end]);
        setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    };

    const handleCustomDateRange = (range) => {
        setCustomDateRange(range);
        onDateSelect([range.start, range.end]);
    };

    const handleYearChange = (year) => {
        setCurrentYear(year);
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        handleMonthChange(newDate);
    };

    const handleAsOfDateChange = () => {
        //console.log('handleAsOfDateChange', date);
        onAsOfDateChange(asOfDateLocal);
    };

    return (
        <div className="date-range-selector">
            <TabsComponent
                activeTab={activeTab}
                onTabChange={onTabChange}
            />

            {activeTab === 'range' ? (
                <RangeSelection
                    selectedRange={selectedRange}
                    onRangeSelect={setSelectedRange}
                    customDateRange={customDateRange}
                    onCustomDateChange={handleCustomDateRange}
                    onDateRangeChange={(range) => handleCustomDateRange(range)}
                />
            ) : activeTab === 'months' ? (
                <MonthsComponent
                    selectedMonth={currentMonth.getMonth()}
                    onMonthSelect={handleMonthSelect}
                    currentMonth={currentMonth}
                    onMonthChange={handleMonthChange}
                    currentYear={currentYear}
                    onYearChange={handleYearChange}
                />
            ) : (
                <CalendarComponent
                    selectedDates={selectedDates}
                    activeTab={activeTab}
                    onDateSelect={handleDateSelection}
                    currentMonth={currentMonth}
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
                />
            )}

            <div className="calendar">
                <button className="apply-button" onClick={onApply}>Apply</button>

                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <label className="as-of-date-label">As Of Date</label>
                    <input
                        type="date"
                        value={asOfDateLocal?.toISOString().split('T')[0]}
                        onChange={(e) => setAsOfDateLocal(new Date(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    />
                    <button className="apply-button" onClick={handleAsOfDateChange}>Apply</button>
                </div>
            </div>
        </div>
    );
};

export default DateRangeSelector;