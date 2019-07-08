import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import { compose } from 'react-komposer';
function postDataLoader(props, onData) {
    setTimeout(function() {
        onData(null, props)
        console.log(props);
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
class LoginScreen extends Component {
    state = {
        loged:false,
        email: '',
        nome: '',
        pssw: '',
    };
    componentDidMount() {
        if(Meteor.userId()) {
            this.setState({loged: true, nome: Meteor.user().username});
        }else{
            this.setState({loged: false, nome:''});
        }
    }
    // responsavel por fazer o login no sistema
    login = () => {
        Meteor.loginWithPassword(this.state.email, this.state.pssw,(result)=>{
            if(!result)
            this.setState({loged:true});
            else
                alert(result);
        });
    };
    // funcao que executa o logout do sistema
    logout = () => {
        Meteor.loggingOut();
            this.setState({loged: false});
    };

    render() {
        console.log(this.state.loged);
        return (
            !this.state.loged?<div style={styles.screen}>
                <Card style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src='/image/login.svg'/>
                    </div>
                    <div  style={styles.fields}>
                        <TextField className="marginFields" error={!validator.isEmail(this.state.email) && this.state.email !== ''}
                                   helperText={validator.isEmail(this.state.email) || this.state.email === '' ? '' : 'E-mail invalido'}
                                   onChange={event => this.setState({email: event.target.value})} label="E-mail"
                        fullWidth/>
                        <TextField className="marginFields" onChange={event => this.setState({pssw: event.target.value})} fullWidth label="Senha"
                                   type="password"/>
                        <Button  className="marginFields" variant='contained' color='primary' onClick={this.login} fullWidth>Entrar</Button>
                        <Button  className="marginButton" variant='outlined' color='secondary'  onClick={() => this.props.history.push('/signup')}
                                fullWidth>Cadastrar</Button>
                        <a onClick={() => this.props.history.push('/recovery')}>Esqueceu sua senha?</a>
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
                <h1>Que bom que você esta por aqui {this.state.nome}</h1>
                <Button  className="marginFields" variant='contained' color='primary' onClick={this.logout} >Logout</Button>
            </Card>
            </div>
        );
    }
}
const options = {
    loadingHandler: () => (<p>Loading...</p>)
};
export const Login = compose(postDataLoader, options)(LoginScreen);