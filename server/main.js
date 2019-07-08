import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir} from './accountManager';
// server/smtp.js
function configureMailServer() {
    const smtp = {
        username: 'user',
        password: 'pss',   // eg: 3eeP1gtizk5eziohfervU
        server:   'domain.com',  // eg: mail.gandi.net
        port: 465
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
}
Meteor.startup(() => {
    configureMailServer();
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'sendEmail':(email)=>sendEmailConfir()
      }

  )
});