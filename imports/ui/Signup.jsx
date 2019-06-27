import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';

export default class Signup extends Component {
    state = {
        email: '',
        nome: '',
        pssw: '',
    };
    signup = () => {

        Meteor.call('signup', this.state.nome, this.state.email, this.state.pssw, this.state.nome)
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
                <Card style={{display: 'flex', width: '80%', height: '80%'}}>
                    <div style={{
                        width: '50%',
                        height: '100%',
                        backgroundColor: "#545c6e",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img style={{width: '50%', height: '100%'}} src='/image/welcome.svg'/>
                    </div>
                    <div style={{
                        width: '50%',
                        display: 'flex',
                        flexFlow: 'column    ',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                    }}>
                        <TextField  style={{marginBottom:'5px'}} error={validator.isEmail(this.state.email)}
                                   helperText={validator.isEmail(this.state.email) || this.state.email === '' ? '' : 'E-mail invalido'}
                                   fullWidth
                                   onChange={event => this.setState({email: event.target.value})} label="E-mail"/>
                        <TextField  style={{marginBottom:'5px'}} fullWidth
                                   onChange={event => this.setState({nome: event.target.value})} label="Nome"/>
                        <TextField style={{marginBottom:'5px'}}  fullWidth onChange={event => this.setState({pssw: event.target.value})} label="Senha"
                                   type="password"/>
                        <TextField style={{marginBottom:'5px'}}  fullWidth label="confirmação da senha" type="password"/>
                        <Button variant='contained' onClick={this.signup} fullWidth>Cadastrar</Button>
                    </div>
                </Card>
            </div>
        );
    }
}