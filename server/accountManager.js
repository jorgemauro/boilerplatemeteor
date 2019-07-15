import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {Email} from "meteor/email";

export const Signup = (username, email, password, profile) => {
    Accounts.createUser({username, email, password, profile});
    return true

};
export const sendEmailConfir=(to)=>{
    Email.send({ to, from:'smtpfree1209@gmail.com', subject:'Jorge', text:'testando' })
};

