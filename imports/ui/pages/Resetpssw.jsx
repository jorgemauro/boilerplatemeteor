import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {Meteor} from "meteor/meteor";
import {compose} from "react-komposer";
import {Accounts} from "meteor/accounts-base";

function postDataLoader(props, onData) {
    setTimeout(function () {
        onData(null, props)
        console.log(props);
    }, 500);
}

const styles = {
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
    },
    card: {display: 'flex', width: '80%', height: '80%'},
    imageContainer: {
        width: '50%',
        height: '100%',
        backgroundColor: "#545c6e",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {width: '50%', height: '100%'},
    fields: {
        width: '50%',
        display: 'flex',
        flexFlow: 'column    ',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
};

class ResetpsswScreen extends Component {
    state = {
        pssw: '',
        psswConfirm: '',
        changed: false,
    };
    resetpssw = () => {
        if (this.comparePsw) {
            let self = this
            Accounts.resetPassword(this.props.match.params.token, this.state.pssw, (resp) => {
                if (resp) {
                    console.log(resp);
                    alert('erro');
                } else
                    self.setState({changed: true});
            });
        } else
            alert('As senhas não são iguais');
    };
    comparePsw = () => {
        return this.state.pssw === this.state.psswConfirm
    };

    render() {
        return (
            <div style={styles.screen}>
                <Card style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src='/image/pssw.svg'/>
                    </div>
                    {this.state.changed ? <div style={styles.fields}><h2>Sua senha foi modificada</h2></div> :
                        <div style={styles.fields}>
                            <TextField className="marginFields" fullWidth
                                       onChange={event => this.setState({pssw: event.target.value})}
                                       label="digite sua nova senha"
                                       type="password"/>
                            <TextField className="marginButton" error={this.comparePsw}
                                       helperText={this.comparePsw ? '' : 'A duas senhas não são identicas'}
                                       onChange={event => this.setState({psswConfirm: event.target.value})} fullWidth
                                       label="confirmação da senha" type="password"/>
                            <Button variant='contained' color="primary" onClick={this.resetpssw} fullWidth>Salvar
                                senha</Button>
                        </div>}
                </Card>
            </div>
        );
    }
}

const options = {
    shouldSubscribe(currentProps, nextProps) {
        console.log("current", currentProps);
        console.log('next', nextProps);
    },
    loadingHandler: () => (<p>Loading...</p>)
};
export const Resetpssw = compose(postDataLoader, options)(ResetpsswScreen);