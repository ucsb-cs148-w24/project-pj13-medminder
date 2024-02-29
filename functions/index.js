const functions = require("firebase-functions");
const username = functions.config().medminder.username;
const password = functions.config().medminder.password;
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

// Define the scheduled task
// Currently: Run at same time every day
// TODO: grab time from database
cron.schedule("50 13 * * *", () => {
  sendEmailNotifications();
});

// Cloud Function to send email notifications
exports.sendScheduledEmails = functions.https.onRequest((req, res) => {
  sendEmailNotifications();
  res.status(200).send("Emails scheduled successfully.");
});

/**
 * Function to send email notifications.
 */
function sendEmailNotifications() {
  // Your logic to fetch data from Firebase Realtime Database
  const db = admin.database();
  const ref = db.ref("/notifications");

  ref.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const email = data.email;
      const message = data.message;

      // Your email sending logic here
      const mailOptions = {
        from: username,
        to: email,
        subject: "Medicine Notification",
        text: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    });
  });
}
