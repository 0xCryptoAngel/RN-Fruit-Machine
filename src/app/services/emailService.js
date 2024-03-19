import axios from 'axios';
import appConfig from '../util/config';

export const sendEmail = async ({ from, to, subject, content}) => {
  try {
    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [
          {
            to: [
              {
                email: to,
              },
            ],
            subject: subject,
          },
        ],
        from: {
          email: from,         
        },
        content: [
          {
            type: 'text/plain',
            value: content,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${appConfig.sendGridKey}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

