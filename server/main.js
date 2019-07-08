import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir} from './accountManager';
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
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'sendEmail':(email)=>sendEmailConfir(email)
      }

  )
});