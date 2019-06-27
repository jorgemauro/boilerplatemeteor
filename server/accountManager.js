import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileMdl } from '../../userprofile/api/UserProfileMdl';
import { Email } from "meteor/email";

export const  Signup= (username, email, password, profile)=>{
  Accounts.createUser({username,email, password,profile});
};
export const Login = (email, password)=>{
}

const rootPath = Meteor.rootPath;
const absolutePath = Meteor.absolutePath;

console.log('Meteor PATHs - rootPath:',rootPath);
console.log('Meteor PATHs - absolutePath:',absolutePath);

function createDefautUser() {
  // if (Meteor.isDevelopment && Meteor.users.find().count() === 0) {
  if (Meteor.users.find().count() === 0) {
    let createdUserId = '';
    createdUserId = Accounts.createUser({
      username: 'Wagner',
      email: 'wagner@Teste.com.br',
      password: 'w2019++',
    });
    Roles.addUsersToRoles(createdUserId, ['Administrador']);
    Meteor.users.update(
        { _id: createdUserId },
        { $set: { 'emails.0.verified': true } }
    );
  }
}


function configureMailServer() {
  process.env.MAIL_URL = 'smtp';
}

Accounts.emailTemplates.from = 'noreply@teste.com.br';

Accounts.emailTemplates.siteName = 'EmpresaTeste';

// region VERIFICAR_EMAIL
Accounts.emailTemplates.sendConfirm = {
  subject() {
    return `${i18n.__('app.email_templates.activate_account')}`;
  },
  text(user, url) {
    const userData = userprofileMdl.findOne({ _id: user._id }) || {},
        urlWithoutHash = url.replace('#/', ''),
        emailAddress = user.emails[0].address,
        supportEmail = 'noreply@Teste.com.br',
        emailBody = i18n.__('app.email_templates.email_verify_body', { username: userData.username, emailAddress, url: urlWithoutHash });
    return emailBody;
  },
  html(user, url) {
    const userData = userprofileMdl.findOne({ _id: user._id }) || {};
    const urlWithoutHash = url.replace('#/', '');
    return (
        emailBody = i18n.__('app.email_templates.email_verify_body', {
          username: `<b>${userData.username}</b>`,
          emailAddress:`<b>${emailAddress}</b>`,
          url: `<a href='}${urlWithoutHash}>${urlWithoutHash}</a>`,
        })
    );
  },
};

Accounts.emailTemplates.enrollAccount.subject = function () {
  return 'Ativação de Cadastro';
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  const userData = userprofileMdl.findOne({ _id: user._id }) || {};
  const urlWithoutHash = url.replace('#/', '');
  const email =
      `${`Olá! ${userData.username || 'usuário'},\n\n` +
      'Clique no link para confirmar seu cadastro&nbsp;\n.' +
      ''}${urlWithoutHash}\n` +
      'Obrigado!\n\n' +
      'Equipe empresa teste';
  return email;
};

Accounts.emailTemplates.enrollAccount.html = function (user, url) {
  const urlWithoutHash = url.replace('#/', '');
  const userData = userprofileMdl.findOne({ _id: user._id }) || {};
  return (
      `${`<p>Prezado(a) ${userData.username || 'usuário'},</p>` +
      '<p>Você foi cadastrado no sistema&nbsp;<strong>Synergia Meteor Starter</strong>.</p>' +
      '<p>Pedimos que confirme o seu cadastro clicando no link abaixo. O link irá direcioná-lo</p>' +
      '<p>para a tela de cadastro de senha.' +
      '<p><ins><a href='}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
      '<p>Obrigado!</p>' +
      '<p><br/><b>Equipe do Synergia Meteor Starter</b></p>'
  );
};

// region ALTERAR_SENHA
Accounts.emailTemplates.resetPassword.subject = function () {
  return 'Alteração de senha - Synergia Meteor Starter.';
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  const userData = userprofileMdl.findOne({ _id: user._id }) || {};
  const urlWithoutHash = url.replace('#/', '');

  const email =
      `${`<p>Prezado(a) ${userData.username || 'usuário'},</p>` +
      '<p>Você solicitou uma nova senha para acessar o software&nbsp;<strong>Synergia Meteor Starter</strong>&nbsp;.</p>' +
      '<p>Sua senha será redefinida ao clicar no link abaixo:</p>' +
      '<p><ins><a href='}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
      '<p>Ao logar no sistema, troque para uma senha de sua preferência.</p>' +
      '<p>Obrigado!</p>' +
      '<p><br/><b>Equipe do Synergia Meteor Starter</b></p>';
  return email;
};

Accounts.emailTemplates.resetPassword.html = function (user, url) {
  const userData = userprofileMdl.findOne({ _id: user._id }) || {};
  const urlWithoutHash = url.replace('#/', '');

  const email =
      `${`<p>Prezado(a) ${userData.nome || 'usuário'},</p>` +
      '<p>Você solicitou uma nova senha para acessar o sistema&nbsp;<strong>Teste</strong>&nbsp;.</p>' +
      '<p>Sua senha será redefinida ao clicar no link abaixo:</p>' +
      '<p><ins><a href='}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
      '<p>Ao logar no sistema, troque para uma senha de sua preferência.</p>' +
      '<p>Obrigado!</p>' +
      '<p><br/><b>Equipe do ApplayCard</b></p>';
  return email;
};
// endregion
const trechosPadronizadosEmails = {
  botaoParaAcessarSistema: `<p align="center"><a href="[[Link]]" class="mui-btn mui-btn--primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;color: #FFF;text-decoration: none;cursor: pointer;white-space: nowrap;font-weight: 500;font-size: 14px;line-height: 14px;letter-spacing: 0.03em;text-transform: uppercase;border-top: 1px solid #465572;border-left: 1px solid #465572;border-right: 1px solid #465572;border-bottom: 1px solid #465572;background-color: #465572;display: inline-block;text-align: center;border-radius: 3px;padding: 10px 25px;">Confirme seu cadastro</a>\n    </p>`,
  botaoCompartilhe: `<p align="center"><a href="[[LinkAmigos]]" class="mui-btn mui-btn--primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;color: #FFF;text-decoration: none;cursor: pointer;white-space: nowrap;font-weight: 500;font-size: 14px;line-height: 14px;letter-spacing: 0.03em;text-transform: uppercase;border-top: 1px solid #465572;border-left: 1px solid #465572;border-right: 1px solid #465572;border-bottom: 1px solid #465572;background-color: #465572;display: inline-block;text-align: center;border-radius: 3px;padding: 10px 25px;">Compartilhe com os seus amigos</a>\n    </p>`,
  assinatura: `<p>Atenciosamente,</p><p>Equipe <img width="100px" src="https://www.Teste.com.br/images/logoAzul.png" /></p>`,
};
const TextoEmailConfirmacao ={
  confirmaEmail: {
    assunto: 'Confirme seu e-mail',
    corpo: `<div style="background-color:rgb(49, 68, 100); padding:30px; ">
    <div style="
    min-height: 400px;
    width: 100%;
    max-width: 700px;
    background-color:#FFFFFF;
    padding:8px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);    
    " >
    
    <h1 style="width:100%; margin-top: 50px; margin-bottom: 70px; padding:20px"> Teste </h1>
    <p style="font-size: 14px;color:#000000; padding: 20px;">
    Olá [[nomeDestinatario]], obrigado por acreditar em novo produto, onde procuramos uma relação de ganha a ganha, respeitando o cliente e procurando entregar a melhor experiência unido dos produtos cartão de crédito e investimento.
     <br/><br/>   
    Em breve teremos mais informações. Se você acha que pode contribuir de alguma forma, mande sua ideia para nós através do e-mail: contato@Teste.com.br.
<br/><br/>
    Agora é só confirmar o seu cadastro.
<br/><br/>
</p>
    <div align="center" style="width:100%; margin-top: 10px; margin-bottom: 10px; padding:20px">
    ${trechosPadronizadosEmails.botaoParaAcessarSistema}
    </div>
    

        <h2 style="margin-top:50px; font-size: 14px;color:#000000;padding: 5px; font-weight: bold">Para que a nossa solução seja disponibilizada mais rápida possível, indique seus amigos e ganhe anuidade grátis.</h2>

    <p style="font-size: 14px;color:#000000; padding: 20px;">
    O cadastramento, envio de ideias e/ou indicação de amigos não implica em obrigação de lançamento, disponibilização do produto ou qualquer remuneração.
<br/><br/>
    Não faça depósitos e/ou pagamentos em nome da Teste, quando do lançamento da nossa solução você será comunicado por e-mail.
<br/><br/>
    Regulamento indique seus amigos
<br/><br/>
    Para cada amigo que se cadastrar através do link de indicação e se tornar cliente Teste, você ganha um ano de isenção de anuidade, limitado a cinco anos, a partir do lançamento do produto. Para que você receba o benefício é necessário que você e seus amigos indicados façam uma aplicação mínima de R$ 100,00 cada, em até 30 dias após o comunicado de lançamento do produto. O lançamento será comunicado através do e-mail informado no ato do cadastro. Os seus amigos poderão indicar os amigos deles e terão os mesmos benefícios e assim sucessivamente. Caso um amigo seja indicado mais de uma vez, será considerando apenas a primeira indicação. Caso seja constatada qualquer violação às regras o benefício pode ser suspenso e cobrado os valores devidos.
    </p> 

    
    <div align="center" style="width:100%; margin-top: 10px; margin-bottom: 10px; padding:20px">
    ${trechosPadronizadosEmails.botaoCompartilhe}
    </div>
    
    ${trechosPadronizadosEmails.assinatura}

    </div>

</div>
`
  },
};


function sendEmailConfirmacao(to, id, nome, subject) {
  SSR.compileTemplate('htmlEmail', Assets.getText('templateEmail.html'));
  const from='Equipe Teste <noreply@Teste.com.br>';
  const replyTo='Equipe Teste <contato@Teste.com.br>';

  const absolute=Meteor.absoluteUrl();
  let corpoEmail = TextoEmailConfirmacao.confirmaEmail.corpo;
  corpoEmail = corpoEmail.replace('[[Link]]', `${absolute}confirma/${id}`);
  corpoEmail = corpoEmail.replace('[[LinkAmigos]]', `${absolute}Compartilhe/${id}`);
  corpoEmail = corpoEmail.replace('[[nomeDestinatario]]', nome);
  corpoEmail = corpoEmail.replace('[[LinkAmigosEscrito]]',`${absolute}Compartilhe/${id}`);

  // Make sure that all arguments are strings.
  check([to, from,replyTo, subject, corpoEmail], [String]);
  // Let other method calls from the same client start running, without
  // waiting for the email sending to complete.
  // this.unblock();
  try {
    const a = Email.send({
      to, from,replyTo, subject, html: SSR.render('htmlEmail', { texto: corpoEmail})
    });
    return 'EMAIL OK';
  } catch (e) {
    throw e;
  }
}
Meteor.methods({
  sendEmailConfirmacao,
});
// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  console.log('fixtures Meteor.startup');
  // Add default admin account
  createDefautUser();
  configureMailServer();
  Accounts.config({
    forbidClientAccountCreation: false, // impede que um usuário seja criado pelo cliente
  });
  Accounts.validateLoginAttempt(({ user, allowed }) => {
    if (!allowed) {
      return allowed;
    }
    if (!user.emails[0].verified) {
      return false;
      throw 'Cadastro não verificado.';
    }
    return true;
  });

});
