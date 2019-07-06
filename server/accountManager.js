import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {Email} from "meteor/email";

export const Signup = (username, email, password, profile) => {
    Accounts.createUser({username, email, password, profile});

};
export const sendEmailConfir=(to, id, nome, subject)=>{
    console.log(Accounts.findUserByEmail(to));
    Accounts.sendResetPasswordEmail(Accounts.findUserByEmail(to), [to],{token:'toke'});
};