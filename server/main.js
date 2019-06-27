import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import {Signup, Login} from './accountManager';
function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      'loggar':(email,password)=>Login(email,password)
      }
  )
});
