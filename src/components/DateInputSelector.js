import { useState, useRef, useEffect } from 'react';

import DateRangeSelector from './DateSelector';
import HeaderComponent from './HeaderComponent';

import './DateSelector.css';

const DateInputSelector = () => {

    // Get first and last day of current month
    const getDefaultDates = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return [firstDay, lastDay];
    };

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('date');
    const [selectedDates, setSelectedDates] = useState(getDefaultDates());
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const [asOfDate, setAsOfDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    });


    // Format the displayed date range
    const formatDisplayDate = (dates) => {
        if (!dates || dates.length === 0) return '';
        if (dates.length === 1) {
            return dates[0]?.toLocaleDateString();
        }
        return `${dates[0]?.toLocaleDateString()} - ${dates[dates.length - 1]?.toLocaleDateString()}`;
    };

    // Handle date selection from the dropdown
    const handleDateSelection = (dates) => {
        setSelectedDates(Array.isArray(dates) ? dates : [dates]);
    };

    // Handle apply button click
    const handleApply = () => {
        setSelectedDates(selectedDates);
        setIsOpen(false);
        // TODO: Call API to get data for the selected dates
    };

    const handleNavigation = (direction) => {
        if (selectedDates.length === 0) return;

        const lastDate = new Date(selectedDates[selectedDates.length - 1]);
        const newStartDate = new Date(lastDate);

        if (direction === 'next') {
            newStartDate.setDate(lastDate.getDate() + 1);
            const range = selectedDates[selectedDates.length - 1].getDate() - selectedDates[0].getDate();
            const newEndDate = new Date(newStartDate);
            newEndDate.setDate(newStartDate.getDate() + range);
            handleDateSelection([newStartDate, newEndDate]);
        } else {
            newStartDate.setDate(lastDate.getDate() - 1);
            const range = selectedDates[selectedDates.length - 1].getDate() - selectedDates[0].getDate();
            const newEndDate = new Date(newStartDate);
            newEndDate.setDate(newStartDate.getDate() - range);
            handleDateSelection([newEndDate, newStartDate]);
        }
    };

    const onPrevious = () => {
        handleNavigation('prev');
    };

    const onNext = () => {
        handleNavigation('next');
    };

    const handleAsOfDateChange = (inputDate) => {
        setAsOfDate(inputDate);
        setIsOpen(false);
    };

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)) {
                setIsOpen(false);
                setActiveTab('date');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="date-input-wrapper">
            <HeaderComponent
                currentRange={{
                    start: selectedDates[0] || new Date(),
                    end: selectedDates[selectedDates.length - 1] || new Date()
                }}
                onPrevious={() => handleNavigation('prev')}
                onNext={() => handleNavigation('next')}
                date={asOfDate}
            />

            <div className="header-nav">
                <button className="nav-button" onClick={onPrevious}>←</button>
                <input
                    ref={inputRef}
                    type="text"
                    className="date-input"
                    value={formatDisplayDate(selectedDates)}
                    onClick={() => {
                        setIsOpen(true);
                        setActiveTab('date');
                    }}
                    readOnly
                    placeholder="Select date range"
                />
                <button className="nav-button" onClick={onNext}>→</button>
            </div>


            <div
                ref={dropdownRef}
                className={`date-dropdown ${isOpen ? 'open' : ''}`}
            >
                <DateRangeSelector
                    selectedDates={selectedDates}
                    onDateSelect={handleDateSelection}
                    onApply={handleApply}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onAsOfDateChange={handleAsOfDateChange}
                    asOfDate={asOfDate}
                />
            </div>
        </div>
    );
};

export default DateInputSelector;