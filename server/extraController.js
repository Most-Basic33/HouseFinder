const nodemailer = require('nodemailer'), { EMAIL, PASSWORD } = process.env
//post to API email

module.exports = {
    email: async (req, res) => {
        //The transporter is essentially the email that you are using to send
        //emails to your users. This is done using NodeMailers createTransport
        //method, passing it an object containing the information needed to 
        //sign into the email.
        try {
//console.log(req.body)
            const { userEmail, subject, text } = req.body;
           // let email = {};
               // text=JSON.stringify(text)
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                requireTLS: true,

                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                },
            })
            // //info gets defined the result of the sendMail method. This method is 
            //attached to your transporter upon its creation. sendMail needs to be
            //passed an object that contains information about the email itself, 
            //meaning the from and to categories, the subject, and the body of the
            //email.

            let info = await transporter.sendMail({
                from: userEmail,
                to: EMAIL,
                subject: subject,
                text: text,

                // let info = await transporter.sendMail({
                //     from: `Bishop Walker <${EMAIL}>`,
                //     to: 'reciever email goes here',
                //     subject: 'NodeMailer Test', //     //text is for plain text support if the html cannot load properly
                //     text: 'This is a NodeMailer Test',
                //     html: `<div>This is a NodeMailer Email</div>`,
               
               
                // attachments: [
                //     {
                //         filename: 'license.txt',
                //         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                //     },
                //     {
                //         cid: 'unique@nodemailer.com',
                //         path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                //     }
                // ]
            }, (err) => {
             
                if (err) {
                    console.log('hit')
                 //   console.log(err)
                } else {
                    res.sendStaus(200).send(info)
                }

            })
        } catch (err) {
            res.status(500).send(err)
        }
    }
}


