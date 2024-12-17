import { useState } from 'react';
import CalendarComponent from './CalendarComponent';

const RangeSelection = ({
    selectedRange,
    onRangeSelect,
    onDateRangeChange,
    customDateRange,
    onCustomDateChange
}) => {
    const [showCalendarView, setShowCalendarView] = useState(false);
    const [activeDateInput, setActiveDateInput] = useState(null); // 'start' or 'end'

    const calculateDateRange = (type) => {

        const today = new Date();
        const start = new Date();
        const end = new Date();

        switch (type) {
            case 'currentMonth':
                start.setDate(1);
                end.setMonth(end.getMonth() + 1, 0);
                break;
            case 'next30':
                end.setDate(today.getDate() + 30);
                break;
            case 'next60':
                end.setDate(today.getDate() + 60);
                break;
            case 'next90':
                end.setDate(today.getDate() + 90);
                break;
            default:
                return customDateRange;
        }

        return {
            start: start,
            end: end
        };
    };

    const handleRangeTypeChange = (type) => {
        onRangeSelect(type);
        if (type !== 'custom') {
            const range = calculateDateRange(type);
            onDateRangeChange(range);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date?.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    // Modify calendar view handler
    const handleCalendarView = (inputType) => {
        if (showCalendarView && activeDateInput !== inputType) {
            // Switch between start/end without closing calendar
            setActiveDateInput(inputType);
        } else {
            setShowCalendarView(!showCalendarView);
            setActiveDateInput(inputType);
        }
    };

    return (
        <div className="range-selection">
            {
                !showCalendarView && (
                    <div className="radio-options">
                        <label className="radio-option">
                            <input
                                type="radio"
                                checked={selectedRange === 'currentMonth'}
                                onChange={() => handleRangeTypeChange('currentMonth')}
                            />
                            <span>Current Month</span>
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                checked={selectedRange === 'next30'}
                                onChange={() => handleRangeTypeChange('next30')}
                            />
                            <span>Next 30 Days</span>
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                checked={selectedRange === 'next60'}
                                onChange={() => handleRangeTypeChange('next60')}
                            />
                            <span>Next 60 Days</span>
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                checked={selectedRange === 'next90'}
                                onChange={() => handleRangeTypeChange('next90')}
                            />
                            <span>Next 90 Days</span>
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                checked={selectedRange === 'custom'}
                                onChange={() => handleRangeTypeChange('custom')}
                            />
                            <span>Custom</span>
                        </label>
                    </div>
                )
            }

            <div className="custom-range">
                {
                    selectedRange === 'custom' && (
                        <div className="custom-range-inputs">
                            <input
                                type="text"
                                value={formatDate(customDateRange.start)}
                                readOnly
                                onClick={() => handleCalendarView('start')}
                                className={activeDateInput === 'start' ? 'active' : ''}
                            />
                            <input
                                type="text"
                                value={formatDate(customDateRange.end)}
                                readOnly
                                onClick={() => handleCalendarView('end')}
                                className={activeDateInput === 'end' ? 'active' : ''}
                            />
                        </div>

                    )
                }

                {
                    showCalendarView && (
                        <CalendarComponent
                            selectedDates={[customDateRange.start, customDateRange.end]}
                            onDateSelect={(date) => {
                                if (activeDateInput === 'start') {
                                    const newStart = date[0];
                                    const newEnd = customDateRange.end && newStart > customDateRange.end
                                        ? newStart
                                        : customDateRange.end;
                                    onCustomDateChange({ start: newStart, end: newEnd });
                                } else {
                                    const newEnd = date[0];
                                    if (newEnd < customDateRange.start) {
                                        onCustomDateChange({ start: newEnd, end: customDateRange.start });
                                    } else {
                                        onCustomDateChange({ start: customDateRange.start, end: newEnd });
                                    }
                                }
                            }}
                            currentMonth={
                                activeDateInput === 'start'
                                    ? customDateRange.start || new Date()
                                    : customDateRange.end || customDateRange.start || new Date()
                            }
                        />
                    )
                }
            </div>

        </div>
    );
};

export default RangeSelection;