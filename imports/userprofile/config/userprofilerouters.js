import { UserProfileContainer } from '../ui/pages/UserProfileContainer';
import {avaliableOffLineOnClient} from '../api/UserProfileDao';
import i18n from 'meteor/universe:i18n';



export const userprofileRouterList = [
  {
    path: '/userprofile/:screenState/:userprofileId',
    title: ()=>i18n.__('app.modules.userprofile.module_title'),
    avaliableOffLine: avaliableOffLineOnClient,
    roles: ['Administrador','Usuario'],
    component: UserProfileContainer,
  },
  {
    path: '/userprofile/:screenState',
    title: ()=>i18n.__('app.modules.userprofile.module_title'),
    avaliableOffLine: avaliableOffLineOnClient,
    roles: ['Administrador'],
    component: UserProfileContainer,
  },
  {
    path: '/userprofile/',
    title: ()=>i18n.__('app.modules.userprofile.module_title'),
    avaliableOffLine: avaliableOffLineOnClient,
    roles: ['Administrador'],
    component: UserProfileContainer,
  },
];
