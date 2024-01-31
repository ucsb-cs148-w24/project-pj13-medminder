import React, { useState } from 'react';

const dateStyle = {
    textAlign: 'center', // Center the text
    fontSize: '100px',    // Increase font size
    marginTop: '0%',    // Adjust vertical positioning (optional)
};

const DateNavigator = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeDate = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + delta);
        setCurrentDate(newDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    return (
        <div style={{ textAlign: 'center' }}> {/* Center the entire content */}
        <button onClick={() => changeDate(-1)}>Previous Day</button>
        <h2 style={dateStyle}>{formatDate(currentDate)}</h2> {/* Apply the styles to the date */}
        <button onClick={() => changeDate(1)}>Next Day</button>
        </div>
    );
};

export default DateNavigator;
