import React, { Component } from 'react';
import { ref, getDatabase, get } from 'firebase/database';
import Toastify from 'toastify-js'

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"></link>

class MedicationReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
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

    let day = ""
    switch (now.getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
         day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break 
      default:
        day = "Unknown"; 
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${day}:${hours}:${minutes}`;
  };

  getData = async () => {
    const { userId } = this.props; // Get user ID from props
    const db = getDatabase();

    const dbDayRef = ref(db, `Users/${userId}/UserData/`);

    // const dbDayRef = ref(db, `Users/${userId}/medicine/day`);
    // const dbTimeRef = ref(db, `Users/${userId}/medicine/time`);
    // const dbDayRef = ref(db, 'Users/testUser123/medicine/day');
    const dbTimeRef = ref(db, 'Users/testUser123/medicine/time');

    try {
        const daySnapshot = await get(dbDayRef);
        const timeSnapshot = await get(dbTimeRef);

        const data1 = daySnapshot.val();
        const data2 = timeSnapshot.val();

        console.log("daySnapshot" + Object.values(data1));

        const time = (data1 || '') + ":" + (data2 || '');

        this.setState({
            time: time.slice(0,-3)
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
      // const currentTime = "Monday:03:00"; 
      
      console.log("currentTime: " + currentTime + " medicationTime: " + time);
      
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
      </div>
    );
  }
}

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

export default MedicationReminder;