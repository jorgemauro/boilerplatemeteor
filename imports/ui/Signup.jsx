import React, { Component } from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
export default class Signup extends Component {
    state = {
        email:'',
        nome:'',
        pssw:'',
    };
signup =()=>{

    Meteor.call('signup',this.state.nome,this.state.email,this.state.pssw,this.state.nome)
};
    render() {
        return (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center', height:'100vh'}}>
                <Card style={{ MinWidth:'600px', display:'flex', flexFlow:'column', alignItems:'center', padding:'10px'}}>
                <TextField error={validator.isEmail(this.state.email)} helperText={validator.isEmail(this.state.email)||this.state.email===''?'':'E-mail invalido'} onChange={event=>this.setState({email:event.target.value})} label="E-mail" />
                <TextField onChange={event=>this.setState({nome:event.target.value})}  label="Nome" />
                <TextField onChange={event=>this.setState({pssw:event.target.value})}  label="Senha" type="password"/>
                <TextField label="confirmação da senha" type="password"/>
                <Button variant='contained' onClick={this.signup} fullWidth>Cadastrar</Button>
                </Card>
            </div>
        );
    }
}