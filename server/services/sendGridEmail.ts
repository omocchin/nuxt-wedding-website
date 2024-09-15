import sgMail from '@sendgrid/mail';
import { useRuntimeConfig } from '#imports';

export const sendGridEmail = async (data: { name: string, email: string, info: any, template: string }) => {
  const config = useRuntimeConfig();
  sgMail.setApiKey(config.sendGridApiKey);

  const msg = {
    to: data.email,
    from: config.sendGridEmail,
    subject: data.info.subject,
    html: data.template,
  };

  await sgMail.send(msg);
};
