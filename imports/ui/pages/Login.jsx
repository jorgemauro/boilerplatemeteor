import React, {Component, useState, useEffect} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import { compose,  } from 'react-komposer';
function postDataLoader(props, onData) {
    setTimeout(function() {
        onData(null, props);
    }, 500);
}
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
    }
};
 const LoginScreen=(props)=> {
     const [loged, setLoged] = useState(false);
     const [email, setEmail] = useState('');
     const [nome, setNome] = useState('');
     const [pssw, setPssw] = useState('');
     useEffect(()=>{
         if(Meteor.userId()) {
             setLoged(true);
             setNome(Meteor.users.findOne(Meteor.userId()).username);
         }else{
             setLoged(false);
         }
     });
    // responsavel por fazer o login no sistema
    const login = () => {
        Meteor.loginWithPassword(email, pssw,(result)=>{
            if(!result)
            setLoged(true);
            else
                alert(result);
        });
    };
    // funcao que executa o logout do sistema
    const logout = () => {
        Meteor.logout(()=>
            setLoged(false));
    };
        return (
            !loged?<div style={styles.screen}>
                <Card style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src='/image/login.svg'/>
                    </div>
                    <div  style={styles.fields}>
                        <TextField className="marginFields" error={!validator.isEmail(email) && email !== ''}
                                   helperText={!validator.isEmail(email) && email === '' ? '' : 'E-mail invalido'}
                                   fullWidth
                                   onChange={event => setEmail(event.target.value)} label="E-mail"/>
                        <TextField className="marginFields" onChange={event => setPssw(event.target.value)} fullWidth label="Senha"
                                   type="password"/>
                        <Button  className="marginFields" variant='contained' color='primary' onClick={login} fullWidth>Entrar</Button>
                        <Button  className="marginButton" variant='outlined' color='secondary'  onClick={() => props.history.push('/signup')}
                                fullWidth>Cadastrar</Button>
                        <a onClick={() => props.history.push('/recovery')}>Esqueceu sua senha?</a>
                    </div>
                </Card>
            </div>:<div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
            }}><Card style={{display:'flex', width:'80%', height:'80%', alignItems:'center', flexFlow:'column'}}>
                <h1>Que bom que você esta por aqui {nome}</h1>
                <Button  className="marginFields" variant='contained' color='primary' onClick={logout} >Logout</Button>
            </Card>
            </div>
        );
};
const options = {
    shouldSubscribe(currentProps, nextProps) {
        console.log("current",currentProps);
        console.log('next',nextProps);
    },
    loadingHandler: () => (<p>Loading...</p>)
};
export const Login = compose(postDataLoader, options)(LoginScreen);