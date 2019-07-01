import { Meteor } from 'meteor/meteor';
import {Signup, Login} from './accountManager';

Meteor.startup(() => {
  Meteor.methods({
        'signup':(nome,email,password)=>Signup(nome,email,password,nome),
      }
  )
});