import React from 'react';
import {ref, onValue} from 'firebase/database';
import { getDatabase } from "firebase/database";
import {Component} from 'react';

// import statement to see userId
import { UserIdContext } from './UserIdContext';

export default class Display extends Component{
    // this type of unwrapping due to implementation choice of "class Display extends Component"
    // means it cannot use hooks
    static contextType = UserIdContext;

    state = {
        name: '',
        med_name: 'Click the Get Data button to display info from the database',
        dosage: "",
        time: ""

    };

    getData = () => {
        // grab userId, to be used in query
        const { userId } = this.context;
        console.log('userId in Display component:', userId);

        const db = getDatabase();
        const dbref = ref(db, 'Users/testUser123/Name');
        onValue(dbref, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                name: data1
            })
        });

        const dbref2 = ref(db, 'Users/testUser123/medicine/name');
        onValue(dbref2, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                med_name: data1
            })
        });

        const dbref3 = ref(db, 'Users/testUser123/medicine/dosage');
        onValue(dbref3, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                dosage: data1
            })
        });

        const dbref4 = ref(db, 'Users/testUser123/medicine/units');
        onValue(dbref4, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                dosage: this.state.dosage + " " + data1
            })
        });

        const dbref5 = ref(db, 'Users/testUser123/medicine/day');
        onValue(dbref5, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                time: data1
            })
        });

        const dbref6 = ref(db, 'Users/testUser123/medicine/time');
        onValue(dbref6, (snapshot) => {
            const data1 = snapshot.val();
            this.setState({
                time: this.state.time + ", " + data1
            })
        });
    }

    render(){

        // grab userId value, print in console 
        // const { userId } = this.context;
        // console.log('userId in Display component:', userId);

        return(
            <div>
            <button onClick={this.getData}>
          get Data
        </button>
        <p>{this.state.med_name}</p>
        <p>{this.state.name}</p>
        <p>{this.state.dosage}</p>
        <p>{this.state.time}</p>
        </div>
        )
    }


}
