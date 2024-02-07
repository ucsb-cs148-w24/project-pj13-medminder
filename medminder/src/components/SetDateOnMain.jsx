import React, { useState } from 'react';
import DataDisplay from './MedicineAlerts';
import './styles.css';

const dateNavigatorStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
};
  
const buttonStyle = {
    margin: '0 30px', // Add margin for spacing between buttons and date
};

const dateStyle = {
    textAlign: 'center', // Center the text
    fontSize: '100px',    // Increase font size
    width: '540px',
    height: '130px',
    marginTop: '0%',    // Adjust vertical positioning (optional)
};

const DateNavigator = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeDate = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + delta);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    return (
        <div style={{ textAlign: 'center' }}> {/* Center the entire content */}
            <div style={dateNavigatorStyle}>
                <button style={buttonStyle} onClick={() => changeDate(-1)}>
                    Previous Day
                </button>
                <h2 style={dateStyle}>{formatDate(currentDate)}</h2>
                <button style={buttonStyle} onClick={() => changeDate(1)}>
                    Next Day
                </button>
                
            </div>
            <button className="todayButton" onClick={goToToday}>
                Today
            </button>
            <DataDisplay date={currentDate.getDay()} />
        </div>
    );
};

export default DateNavigator;
