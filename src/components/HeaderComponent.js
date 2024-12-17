//import './HeaderComponent.css';

const HeaderComponent = ({
    date
}) => {
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const getYesterday = () => {
        const today = new Date();
        return new Date(today.setDate(today.getDate() - 1));
    };

    const getAsOfDate = () => {
        const dateToUse = date || getYesterday();
        return formatDate(dateToUse).toUpperCase();
    };

    return (
        <div className="header">
            <div className="header-title">
                STAY DATES - AS OF
                <span className="header-date">{getAsOfDate()}</span>
            </div>

        </div>
    );
};

export default HeaderComponent;