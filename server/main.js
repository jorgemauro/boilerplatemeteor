import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir} from './accountManager';
import {Accounts} from 'meteor/accounts-base';
// server/smtp.js
function configureMailServer() {
    const smtp = {
        username: 'smtpfree1209@gmail.com',
        password: 'senha',
        server:   'smtp.gmail.com',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port+'?tls.rejectUnauthorized=false';
}
Meteor.startup(() => {
    configureMailServer();
    Accounts.emailTemplates.siteName = 'boilerPlate';
    Accounts.emailTemplates.from = 'Boilerplate <accounts@example.com>';

    Accounts.emailTemplates.enrollAccount.subject = (user) => {
        return `Welcome to Awesome Town, ${user.profile.name}`;
    };

    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
        return 'You have been selected to participate in building a better future!'
            + ' To activate your account, simply click the link below:\n\n'
            + url;
    };

    Accounts.emailTemplates.resetPassword.from = () => {
        // Overrides the value set in `Accounts.emailTemplates.from` when resetting
        // passwords.
        return 'Boilerplate Password Reset <no-reply@example.com>';
    };
    Accounts.emailTemplates.resetPassword.subject = (user,url) => {
        return `recuperar a senha`;
    };
    Accounts.emailTemplates.resetPassword.text = (user,url) => {
        return `Seja bem vindo, ${user.username}! esse é o link para verificação do : ${url}`;
    };
    Accounts.emailTemplates.verifyEmail = {
        subject() {
            return "você ativou sua nova!";
        },
        text(user, url) {
            return `Seja bem vindo, ${user}! esse é o link para verificação do : ${url}`;
        }
    };
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'sendEmail':(email)=>sendEmailConfir(email)
      }

  )
});