import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';

export default class Login extends Component {
    state = {
        email: '',
        nome: '',
        pssw: '',
    };
    login = () => {
        Meteor.loginWithPassword(this.state.email, this.state.pssw)
    };

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
            }}>
                <Card style={{display:'flex', width:'80%', height:'80%'}}>
                    <div style={{width:'50%', height:'100%', backgroundColor:"#545c6e", display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <img style={{width:'50%', height:'100%'}} src='/image/login.svg'/>
                    </div>
                    <div  style={{
                        width: '50%',
                        display: 'flex',
                        flexFlow:'column    ',
                        justifyContent:'center',
                        alignItems: 'center',
                        padding: '10px'
                    }}>
                        <TextField style={{marginBottom:'5px'}} error={validator.isEmail(this.state.email)}
                                   helperText={validator.isEmail(this.state.email) || this.state.email === '' ? '' : 'E-mail invalido'}
                                   onChange={event => this.setState({email: event.target.value})} label="E-mail"
                        fullWidth/>
                        <TextField style={{marginBottom:'5px'}} onChange={event => this.setState({pssw: event.target.value})} fullWidth label="Senha"
                                   type="password"/>
                        <Button style={{marginBottom:'5px'}} variant='contained' onClick={this.login} fullWidth>Entrar</Button>
                        <Button style={{marginBottom:'5px'}} variant='contained' onClick={() => this.props.history.push('/signup')}
                                fullWidth>Cadastrar</Button>
                    </div>
                </Card>
            </div>
        );
    }
}