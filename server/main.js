import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir} from './accountManager';

function configureMailServer() {
    process.env.MAIL_URL = 'contato@trovadordosmundos.com:teste123456789@smtp.trovadordosmundos.com:465';
}
Meteor.startup(() => {
    configureMailServer();
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'sendEmail':(email)=>sendEmailConfir(email)
      }

  )
});