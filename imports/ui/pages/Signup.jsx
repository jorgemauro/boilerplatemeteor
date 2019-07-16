import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
const styles={
    screen:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
    },
    card:{display:'flex', width:'80%', height:'80%'},
    imageContainer:{width:'50%', height:'100%', backgroundColor:"#545c6e", display:'flex', justifyContent:'center', alignItems:'center'},
    image:{width:'50%', height:'100%'},
    fields:{
        width: '50%',
        display: 'flex',
        flexFlow:'column    ',
        justifyContent:'center',
        alignItems: 'center',
        padding: '10px'
    },
};
class Signup extends Component {
    state = {
        email: '',
        nome: '',
        pssw: '',
        psswConfirm: '',
    };
    signup = () => {
        Accounts.createUser({username:this.state.nome, email:this.state.email, password:this.state.pssw, profile:this.state.nome},(resp)=>{
            if(resp)
                console.log(resp);
            else
                Meteor.call('signup', this.state.nome);
        });
    };
    comparePsw=()=>{
        return this.state.pssw===this.state.psswConfirm
    };
    render() {
        return (
            <div style={styles.screen}>
                <Card style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src='/image/welcome.svg'/>
                    </div>
                    <div style={styles.fields}>
                        <TextField className="marginFields" error={!validator.isEmail(this.state.email) && this.state.email !== ''}
                                   helperText={!validator.isEmail(this.state.email) && this.state.email === '' ? '' : 'E-mail invalido'}
                                   fullWidth
                                   onChange={event => this.setState({email: event.target.value})} label="E-mail"/>
                        <TextField className="marginFields"  fullWidth
                                   onChange={event => this.setState({nome: event.target.value})} label="Nome"/>
                        <TextField className="marginFields"   fullWidth onChange={event => this.setState({pssw: event.target.value})} label="Senha"
                                   type="password"/>
                        <TextField className="marginButton" error={this.comparePsw} helperText={this.comparePsw ? '' : 'A duas senhas não são identicas'}   onChange={event => this.setState({psswConfirm: event.target.value})}   fullWidth label="confirmação da senha" type="password"/>
                        <Button variant='contained' color="primary" onClick={this.signup} fullWidth>Cadastrar</Button>
                    </div>
                </Card>
            </div>
        );
    }
}
export default Signup;