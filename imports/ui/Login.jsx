import React, { Component } from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
export default class Login extends Component {
    state = {
        email:'',
        nome:'',
        pssw:'',
    };
    login =()=>{
        Meteor.loginWithPassword(this.state.email,this.state.pssw)
    };
    render() {
        return (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center', height:'100vh'}}>
                <Card style={{ MinWidth:'600px', display:'flex', flexFlow:'column', alignItems:'center', padding:'10px'}}>
                    <TextField error={validator.isEmail(this.state.email)} helperText={validator.isEmail(this.state.email)||this.state.email===''?'':'E-mail invalido'} onChange={event=>this.setState({email:event.target.value})} label="E-mail" />
                    <TextField onChange={event=>this.setState({pssw:event.target.value})}  label="Senha" type="password"/>
                    <Button variant='contained' onClick={this.login} fullWidth>Entrar</Button>
                    <Button variant='contained' onClick={()=>this.props.history.push('/signup')} fullWidth>Cadastrar</Button>
                </Card>
            </div>
        );
    }
}