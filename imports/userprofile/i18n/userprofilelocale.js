import i18n from 'meteor/universe:i18n';
import { userProfileSch } from '../api/UserProfileSch';
import addTranslationBySchema from '../../libs/addTranslationBySchema'



const setModuleLocale = () => {

  // en-US
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'module_title', 'User profile');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'list_title', 'User profile');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'list_subtitle', 'List of users');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'delete_userprofile_message', 'Do you really want to remove {$name}?');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'view_title', 'User profile');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'view_subtitle', 'Informations of users');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'edit_title', 'User profile');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'edit_subtitle', 'Change User Information');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'change_userprofile_message', 'Do you really want save the change?');

  addTranslationBySchema(userProfileSch, 'app.modules.userprofile.schema', 'en-US');
  // Use default label


  // pt-BR
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'module_title', 'Usuário');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'list_title', 'Usuários');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'list_subtitle', 'Lista de usuários');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'delete_userprofile_message', 'você realmente deseja excluir {$name}?');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'view_title', 'Usuário');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'view_subtitle', 'Informações do usuário');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'edit_title', 'Usuário');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile', 'edit_subtitle', 'Alterar as informações do usuário');
  i18n.addTranslation('en-US', 'app.modules.userprofile', 'change_userprofile_message', 'Você realmente quer salver a mudança?');


  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema', 'username', 'Nome');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema', 'email', 'Email');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema', 'roles', 'Perfil de Acesso');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema', 'language', 'Idioma');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema_language', 'en-US', 'Inglês');
  i18n.addTranslation('pt-BR', 'app.modules.userprofile.schema_language', 'pt-BR', 'Português');
};

setModuleLocale();

