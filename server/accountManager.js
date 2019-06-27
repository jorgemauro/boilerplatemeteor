import { Accounts } from 'meteor/accounts-base';

export const  Signup= (username, email, password, profile)=>{
  Accounts.createUser({username,email, password,profile});
};
export const Login = (email, password)=>{
}