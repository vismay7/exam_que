import nodeMailer from "nodemailer";

const transport = nodeMailer.createTransport({
  host: "mail.mailtest.radixweb.net",
  port: 465,
  auth: {
    user: "testdotnet@mailtest.radixweb.net",
    pass: "Radix@web#8",
  },
});

export const sendMail = (body: string, mail: string) => {
  var mailOptions = {
    from: "testdotnet@mailtest.radixweb.net",
    to: `${mail}`,
    subject: "Sending Email using Node.js",
    text: `${body}`,
  };
  transport.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
