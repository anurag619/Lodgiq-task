import CalendarNavigationComponent from './CalendarNavigationComponent';


const MonthsComponent = ({
    selectedMonth,
    onMonthSelect,
    currentMonth,
    onMonthChange,
    currentYear,
    onYearChange
}) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const handleYearChange = (year) => {
        onYearChange(year);
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        onMonthChange(newDate);
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

    return (
        <>
            <div className="month-navigation">
                <CalendarNavigationComponent
                    currentYear={currentMonth?.getFullYear()}
                    onYearChange={handleYearChange}
                    onNavigate={handleNavigate}
                />
            </div>

            <div className="month-grid">
                {months.map((month, index) => (
                    <button
                        key={month}
                        className={`month-button ${selectedMonth === index ? 'selected' : ''}`}
                        onClick={() => onMonthSelect(index)}
                    >
                        {month}
                    </button>
                ))}
            </div>
        </>
    );
};

export default MonthsComponent;