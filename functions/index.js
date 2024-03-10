const functions = require("firebase-functions");
const username = functions.config().medminder.username;
const password = functions.config().medminder.password;
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Cloud Function to send email notifications
exports.sendScheduledEmails = functions.https.onRequest(async (req, res) => {
  try {
    // Grab current date, time zone: UTC if run by Google Functions
    const now = new Date();

    // Convert UTC to PDT (UTC-7)
    const shift = 7;

    const hours = (now.getHours() + (24 - shift)) % 24;
    const formatHours = (hours < 10) ? `0${hours}` : hours;
    const minutes = now.getMinutes();
    const formatMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const currentTime = `${formatHours}:${formatMinutes}`;

    console.log("Current Time:", currentTime);

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday",
      "thursday", "friday", "saturday"];
    const day = now.getDay();
    const adjustment = hours + shift >= 24 ? 6 : 0;
    const currentDay = daysOfWeek[(day + adjustment) % 7] || "unknown";

    console.log("Current Day:", currentDay);

    // Reference to the root of your database
    const rootRef = admin.database().ref();

    // Get all user IDs
    const userIDsSnapshot = await rootRef.child("/Users").once("value");
    const userIDs = Object.keys(userIDsSnapshot.val() || {});

    // Iterate through UserIDs
    for (const userID of userIDs) {
      console.log("UserID:", userID);
      // Get all alerts for the current user
      const alertsSnapshot =
        await rootRef.child(`/Users/${userID}/UserData`).once("value");
      const alerts = alertsSnapshot.val() || {};

      const email =
        (await rootRef.child(`/Users/${userID}/UserInfo/Email`).once("value"))
            .val();

      const notifOn =
        (await rootRef.child(`/Users/${userID}/UserPref/Email`).once("value"))
            .val();

      // If Email Notifications are tooggled off, skip user
      if (!notifOn) {
        console.log("skipped:", userID);
        continue;
      }

      for (const alertKey of Object.keys(alerts)) {
        const alert = alerts[alertKey];
        const alertTime = alert.time;
        const isDay = alert.day[currentDay];

        console.log("time:", alertTime);

        if (isDay && alertTime == currentTime) {
          const amt = alert.dosageAmount;
          const unit = alert.dosageUnits;
          const name = alert.medicineName;

          const subject = "Medicine Notification";
          const body = `This is a reminder to take ${amt} ${unit} of ${name}!`;
          sendEmail(email, subject, body);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }

  res.status(200).send("Email(s) sent successfully.");
});

/**
 * Send an email from "medminder.notifications@gmail.com"
 * @param {string} dest - destination email address
 * @param {string} sub - subject of email to be sent
 * @param {string} body - body of email to be sent
 */
function sendEmail(dest, sub, body) {
  // const mailOptions = {
  // from: username,
  // to: "medminder.notifications@gmail.com",
  // subject: "Medicine Notification",
  // text: "This is a reminder to take X units of Medication Y!",
  // };

  const mailOptions = {
    from: username,
    to: dest,
    subject: sub,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
