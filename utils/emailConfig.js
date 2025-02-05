import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendPatientEmail = async (email, results) => {
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Köszönjük, hogy kitöltötte kérdőívünket!",
    text: `Köszönjük, hogy időt szánt a betegelégedettségi kérdőívünk kitöltésére. A válaszai a következők:\n\n${results
      .map(
        (result, index) => `${index + 1}. ${result.question}: ${result.answer}`
      )
      .join("\n")}`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to patient");
  } catch (error) {
    console.error("Error sending email to patient:", error);
  }
};

export const sendAdminNotification = async (adminEmails, results) => {
  const msg = {
    to: adminEmails,
    from: process.env.FROM_EMAIL,
    subject: "Új kérdőív válasz érkezett",
    text: `Új válasz érkezett a betegelégedettségi kérdőívünkre. A válaszok a következők:\n\n${results
      .map(
        (result, index) => `${index + 1}. ${result.question}: ${result.answer}`
      )
      .join("\n")}`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to admins");
  } catch (error) {
    console.error("Error sending email to admins:", error);
  }
};
