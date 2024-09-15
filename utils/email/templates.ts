import { confirmEmail } from '~/utils/email/info'
import { camelCaseToLowerWithSpaces, booleanToYesNo } from '~/utils/variables/functions'

const rsvpInfoTemplate = (rsvpInfos: any) => {
  let rsvpInfo = ''
  for (const rsvp of rsvpInfos) {
    let values = ''
    for (const key in rsvp?.values) {
      const template = rsvp?.values[key] ? `<p>&nbsp;&nbsp;&nbsp;&nbsp;${camelCaseToLowerWithSpaces(key)}:&nbsp;&nbsp;&nbsp;&nbsp;${booleanToYesNo(rsvp?.values[key])}</p>` : ''
      values = values + template
    }
    const template = `
      <div class="rsvp-info">
        <h2>${rsvp?.title}</h2>
        ${values}
      </div>
    `
    rsvpInfo = rsvpInfo + template
  }
  return rsvpInfo
}

export const confirmationTemplate = (name: string | null, emailValues?: any) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wedding Confirmation Email</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f7f3ed;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #f2d6cf;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          color: #6a4f4b;
          margin: 0;
          font-size: 24px;
        }
        .header img {
          max-width: 100px;
        }
        .content {
          padding: 20px;
          text-align: left;
        }
        .content h2 {
          color: #6a4f4b;
          font-size: 20px;
        }
        .content p {
          font-size: 16px;
          color: #333;
          margin: 10px 0;
        }
        .content .rsvp-info {
          text-align: left;
        }
        .footer {
          background-color: #eae0d5;
          padding: 10px;
          text-align: center;
          font-size: 14px;
          color: #6a4f4b;
          border-radius: 0 0 8px 8px;
        }
        .floral-image {
          margin-top: 20px;
        }
        .floral-image img {
          width: 100px;
          display: block;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${confirmEmail.headerContent}
        </div>
        <div class="content">
          <h2>Dear ${name},</h2>
          ${confirmEmail.mainContent}
          </br>
          ${rsvpInfoTemplate(emailValues)}
        </div>
        <div class="footer">
          ${confirmEmail.footerContent}
        </div>
      </div>
    </body>
    </html>
  `
}