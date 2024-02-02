import React, { Component } from 'react';
import { ref, getDatabase, get } from 'firebase/database';
import Toastify from 'toastify-js'

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"></link>

class MedicationReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
    };
  }
  componentDidMount() {
    this.checkMedicationTime();

    // Set up an interval to check the medication time every minute
    this.intervalId = setInterval(() => {
      this.checkMedicationTime();
    }, 60000);
  }

  componentWillUnmount() {
    // Clear the interval on component unmount
    clearInterval(this.intervalId);
  }

  getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
  };

  getData = async () => {
    const db = getDatabase();
    const dbref5 = ref(db, 'Users/testUser123/medicine/day');
    const dbref6 = ref(db, 'Users/testUser123/medicine/time');

    try {
        const snapshot5 = await get(dbref5);
        const snapshot6 = await get(dbref6);

        const data1 = snapshot5.val();
        const data2 = snapshot6.val();

        const time = (data1 || '') + (data2 || '');

        this.setState({
            time: time.slice(-8, -3)
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

  checkMedicationTime = async () => {
    try {
      await this.getData(); 

      const { time } = this.state;
      const currentTime = this.getCurrentTime();
      // comment the above line and put the line below to see the toast
      // const currentTime = "03:00"; 
      
      console.log("currentTime:" + currentTime + " medicationTime: " + time);
      
      if (time === currentTime) {
        console.log("time==currentTime!");
        Toastify({
          text: "It's time to take your medicine!",
          duration: 10000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom'
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();

        console.log("Toast shown");
      }
    } catch (error) {
      console.error('Error checking medication time:', error.message);
    }
  };

  render() {
    return (
      <div>
        <h1>Medicine Alert Active</h1>
      </div>
    );
  }
}

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

export default MedicationReminder;