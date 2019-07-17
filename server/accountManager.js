import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {Email} from "meteor/email";

export const Signup = (username) => {
    Accounts.sendVerificationEmail(Accounts.findUserByUsername(username));

};
export const sendEmailConfir = (to) => {
    Email.send({to, from: 'smtpfree1209@gmail.com', subject: 'Jorge', text: 'testando'})
};

export const bodyEmail = (username, Text) => {

    const body = `<table style="
      background-color: rgb(255, 255, 255);
      border-top-width: 0;
      border-right-width: 0;
      border-bottom-width: 0;
      border-left-width: 0;
      border-collapse: collapse;
      width: 100%;
    ">
      <tbody>
      <table style="margin: 0 auto; padding: 0;
        max-width:600px;background-color: #fafafa; text-align: center">
        <tbody style="width:100%">
        <tr  style="width:100%">
          <td>
          <table style="padding:10px; border-collapse:separate; border-spacing:10px;">
        <tr>
          <td style="color:#808080; text-align:center;">
            <p style="color:#edbd65; font-weight:bolder; font-size:20px;">Olá, ${username}!</p>
            ${Text}
            </p>
          </td>
        </tr>
      </table></td>
        </tr>
        </tbody>
      </table>
      </tbody>
    </table>`;
    return body;
};
