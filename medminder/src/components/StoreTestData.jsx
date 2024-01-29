import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";

const SimpleDataSender = () => {
    const [sentence, setSentence] = useState('');

    const sendSentenceToFirebase = () => {
        if (!sentence.trim()) {
            alert('Type something.');
            return;
        }

        const database = getDatabase();
        const sentenceRef = ref(database, 'simpleData');
        
        set(sentenceRef, { sentence: sentence })
            .then(() => alert('Data sent to Firebase!'))
            .catch((e) => {
                console.error("Error sending data to Firebase: ", e);
                alert('Error sending data to Firebase');
            });

        setSentence(''); // Clear the sentence field after sending
    };

    return (
        <div>
            <input 
                type="text" 
                value={sentence}
                onChange={(e) => setSentence(e.target.value)} 
                placeholder="Type something"
            />
            <button onClick={sendSentenceToFirebase}>Send Data</button>
        </div>
    );
};

export default SimpleDataSender;
