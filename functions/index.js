const functions = require("firebase-functions");
const username = functions.config().medminder.username;
const password = functions.config().medminder.password;
// const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
// const cron = require("node-cron");

// admin.initializeApp();

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
exports.sendScheduledEmails = functions.https.onRequest((req, res) => {
  sendEmailNotifications();
  res.status(200).send("Email sent successfully.");
});

/**
 * Function to send email notifications.
 */
function sendEmailNotifications() {
  // const db = admin.database();
  // const ref = db.ref("/notifications");

  // ref.once("value", (snapshot) => {
  // snapshot.forEach((childSnapshot) => {
  // const data = childSnapshot.val();
  // const email = data.email;
  // const message = data.message;
  // });

  // Send Email
  const mailOptions = {
    from: username,
    to: "medminder.notifications@gmail.com",
    subject: "Medicine Notification",
    text: "This is a reminder to take X units of Medication Y!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
// });
}
