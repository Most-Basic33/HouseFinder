const { EMAIL, SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
//post to API email
module.exports = {
  email: async (req, res) => {
    console.log(EMAIL)
    let msg;
    let { userEmail, subject, text } = req.body;
    console.log(req.body, "req body");
    try {
      text = JSON.stringify(text);
      msg = {
        to: EMAIL,
        from: EMAIL, // Use the email address or domain you verified above
        subject: `${subject}`,
        text: `${text}`,
        html: `<strong>${text}</strong>`,
      };
      try {
        const sendGridRes = sgMail.send(msg);
        console.log(sendGridRes);
        await sendGridRes;
        console.log('finished waiting for promise');
        res.status(200).send(msg);
      } catch (err) {
        console.log(err.response.body);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};