import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';

const
    styles ={
        background:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
        },
        card:{display: 'flex', width: '50%', height: '55%',
            flexFlow:'column', alignItems:'center', justifyContent:'center'},
        imgContainer:{
            width: '94%',
            height: '70%',
            backgroundColor: "#545c6e",
            display: 'flex',
            marginBottom:'10px',
            justifyContent: 'center',
            alignItems: 'center'
        },
        img:{width: '90%', height: '100%'},
        contentContainer:{
            width: '90%',
            display: 'flex',
            flexFlow: 'column    ',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px'
        },

    };
class RecoverPassword extends Component {
    state = {
        email: '',
    };
    sendEmailRecover = () => {
        Accounts.forgotPassword({email: this.state.email}, function (e, r) {
                if (e) {
                    console.log(e.reason);
                } else {
                    console.log("foi!")
                }
            });

        //Meteor.call('sendEmail', this.state.email);
    };
    render() {
        return (
            <div style={styles.background}>
                <Card style={styles.card}>
                    <div style={styles.imgContainer}>
                        <img style={styles.img} src='/image/getemail.svg'/>
                    </div>
                    <div style={styles.contentContainer}>
                        <TextField  style={{marginBottom:'5px'}} error={validator.isEmail(this.state.email)}
                                    helperText={validator.isEmail(this.state.email) || this.state.email === '' ? '' : 'E-mail invalido'}
                                    fullWidth
                                    onChange={event => this.setState({email: event.target.value})} label="Entre com seu e-mail registrado"/>
                        <Button variant='contained' color='primary' onClick={this.sendEmailRecover} fullWidth>Enviar e-mail</Button>
                    </div>
                </Card>
            </div>
        );
    }
}
export default RecoverPassword;