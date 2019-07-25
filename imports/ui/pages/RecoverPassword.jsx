import React, {Component, useState} from 'react';
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
        card:{display: 'flex', width: '80%', height: '85%',
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
const RecoverPassword =(props)=> {
    const [email, setEmail] = useState('');
    const [enviado, setEnviado] = useState(false);
    const sendEmailRecover = () => {
        props.isLoading(true);
        Accounts.forgotPassword({email:email}, function (e, r) {
                if (e) {
                    console.log(e.reason);
                } else {
                   setEnviado(true);
                    props.isLoading(false);
                }
            });

        //Meteor.call('sendEmail', this.state.email);
    };
        return (
            enviado?<div style={styles.background}>
                <Card style={styles.card}>
                    <div style={styles.imgContainer}>
                        <img style={styles.img} src='/image/sendEmail.svg'/>
                    </div>
                </Card>
            </div>:<div style={styles.background}>
                <Card style={styles.card}>
                    <div style={styles.imgContainer}>
                        <img style={styles.img} src='/image/getemail.svg'/>
                    </div>
                    <div style={styles.contentContainer}>
                        <TextField className="marginFields" error={!validator.isEmail(email) && email !== ''}
                                   helperText={!validator.isEmail(email) && email === '' ? '' : 'E-mail invalido'}
                                   fullWidth
                                   onChange={event => setEmail(event.target.value)} label="Digite aqui seu e-mail para recuperar sua senha"/>
                        <Button variant='contained' color='primary' onClick={sendEmailRecover} fullWidth>Enviar e-mail</Button>
                    </div>
                </Card>
            </div>
        );

};
export default RecoverPassword;