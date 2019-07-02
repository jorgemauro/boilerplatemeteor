import { Meteor } from 'meteor/meteor';
import {Signup, sendEmailConfir} from './accountManager';

function configureMailServer() {
    process.env.MAIL_URL = 'smtp://localhost';
}
Meteor.startup(() => {
    configureMailServer;
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'sendEmail':(email)=>sendEmailConfir('jorgemauro1000@hotmail.com','10','jorge',"é isso ai")
      }

  )
});