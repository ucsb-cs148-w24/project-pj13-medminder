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
    // Reference to the root of your database
    const rootRef = admin.database().ref();

    // Get all user IDs
    const userIDsSnapshot = await rootRef.child("/Users").once("value");
    const userIDs = Object.keys(userIDsSnapshot.val() || {});

    // Iterate through UserIDs
    for (const userID of userIDs) {
      // Get all alerts for the current user
      const alertsSnapshot =
        await rootRef.child(`/Users/${userID}/UserData`).once("value");
      const alerts = alertsSnapshot.val() || {};

      const email =
        (await rootRef.child(`/Users/${userID}/UserInfo/Email`).once("value"))
            .val();

      for (const alertKey of Object.keys(alerts)) {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = `${(hours-8)%24}:${minutes}`;

        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday",
          "thursday", "friday", "saturday"];
        const day = now.getDay();
        const adjustment = hours < 8 ? -1 : 0;
        const currentDay = daysOfWeek[(day + adjustment) % 7] || "unknown";

        const alert = alerts[alertKey];
        const alertTime = alert.time;
        const isDay = alert.day[currentDay];

        // DEBUG:
        console.log("isDay:", isDay);
        console.log("alertTime:", alertTime);
        console.log("currentTime:", currentTime);
        console.log("result:", isDay && alertTime == currentTime);
        console.log();

        if (isDay && alertTime == currentTime) {
          console.log("attempting to send email, matched");
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
