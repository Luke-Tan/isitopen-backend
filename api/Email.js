const MongoDB = require('../db/MongoDB');
const nodemailer = require('nodemailer')

const Email = {
    // post 
    InviteFriends: (request, response) => {
        let { emails, collection } = request.body;
        const { _id, name } = collection;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'journyal@gmail.com',
                pass: '9interestingmudfiSh5'
            }
        });

        const mailOptions = {
            from: 'journyal@gmail.com',
            to: emails.join(', '), //Converts emails into a string seperated by commas
            subject: 'Sending Email using Node.js',
            text: `Your friend has invited you to collaborate with him on his restaurant collection, ${name}, you can access it at http://localhost:3000?invitedCollection=${_id}`
        };  
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                response.status(400).send({code:400, message: error})
            } else {
                console.log('Email sent: ' + info.response);
                response.status(200).send(info.response)
            }
        });
    },
}

module.exports = Email;