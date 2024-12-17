

const CalendarNavigationComponent = ({
    currentYear,
    currentMonth,
    onYearChange,
    onNavigate
}) => {
    return (
        <div className="calendar-navigation">
            <div className="nav-arrows">
                <button
                    className="nav-arrow"
                    onClick={() => onYearChange(currentYear - 1)}
                    title="Previous Year"
                >
                    «
                </button>
                <button
                    className="nav-arrow"
                    onClick={() => onNavigate('prev')}
                    title="Previous Month"
                >
                    ‹
                </button>
            </div>
            <div>
                {
                    currentMonth && (
                        <span className="month-display">
                            {currentMonth.toLocaleString('default', { month: 'long' })}
                        </span>
                    )
                }

                <span className="year-display">
                    {currentYear}
                </span>
            </div>


            <div className="nav-arrows">
                <button
                    className="nav-arrow"
                    onClick={() => onNavigate('next')}
                    title="Next Month"
                >
                    ›
                </button>
                <button
                    className="nav-arrow"
                    onClick={() => onYearChange(currentYear + 1)}
                    title="Next Year"
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default CalendarNavigationComponent;