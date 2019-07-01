import AccountCircle from '@material-ui/icons/AccountCircle';
import {avaliableOffLineOnClient} from '../api/UserProfileDao';
import i18n from 'meteor/universe:i18n';

export const userprofileMenuItemList = [
  {
    path: '/userprofile',
    title: ()=>i18n.__('app.modules.userprofile.module_title'),
    icon: AccountCircle,
    avaliableOffLine: avaliableOffLineOnClient,
    roles: ['Administrador'],
  },
];
