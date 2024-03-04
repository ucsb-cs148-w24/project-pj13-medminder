import React, { useState } from 'react';
import "@material/react-switch/dist/switch.css";
import Switch from '@material/react-switch';

const EmailToggle = () => {
    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <Switch
                nativeControlId='toggle'
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor='toggle' classname="email-switch">Email Notifications</label>
        </React.Fragment>
    );

}

export default EmailToggle;