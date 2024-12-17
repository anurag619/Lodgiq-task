const TabsComponent = ({ activeTab, onTabChange }) => {
    const tabs = ['Date', 'Range', 'Weeks', 'Months'];

    return (
        <div className="tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.toLowerCase())}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabsComponent;