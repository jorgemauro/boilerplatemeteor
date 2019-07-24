import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir, bodyEmail} from './accountManager';
import {Accounts} from 'meteor/accounts-base';
// server/smtp.js
function configureMailServer() {
    const smtp = {
        username: 'smtpfree1209@gmail.com',
        password: 'T123456e',
        server:   'smtp.gmail.com',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port+'?tls.rejectUnauthorized=false';
}
const body =

Meteor.startup(() => {
    configureMailServer();
    Accounts.emailTemplates.siteName = 'boilerPlate';
    Accounts.emailTemplates.from = 'Boilerplate <accounts@example.com>';
    Accounts.emailTemplates.enrollAccount.subject = (user) => {
        return `Bom te ver por aqui, ${user.profile.name}`;
    };



    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
        return ' Para ativar sua conta basta clicar no link:\n\n'
            + url;
    };

    Accounts.emailTemplates.resetPassword.from = () => {
        return 'Boilerplate Password Reset <no-reply@boiler.com>';
    };
    Accounts.emailTemplates.resetPassword.subject = (user,url) => {
        return `recuperação a senha - Boilerplate`;
    };
    Accounts.emailTemplates.resetPassword.html = (user,url) => {
        const urlSplit=url.split('/');
        const urlfinal=urlSplit[0]+'//'+urlSplit[2]+'/'+urlSplit[4]+'/'+urlSplit[5];
        return bodyEmail(user.username,` link para cria a nova senha : <a href="${urlfinal}">Clique aqui</a>`);
    };
    Accounts.emailTemplates.verifyEmail = {
        subject() {
            return "Ative sua conta!!";
        },
        html(user, url) {
            const urlSplit=url.split('/');
            const urlfinal=urlSplit[0]+'//'+urlSplit[2]+'/'+urlSplit[4]+'/'+urlSplit[5];
            return bodyEmail(user.username,`esse é o link para verificação do : <a href="${urlfinal}">Clique aqui</a>`);
        }
    };
  Meteor.methods({
        'signup':(nome)=>Signup(nome),
      'sendEmail':(email)=>sendEmailConfir(email),
      'resetpssw':(pssw, token)=>resetpssw(pssw, token)
      }

  )
});