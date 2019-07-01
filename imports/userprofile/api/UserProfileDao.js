// region Imports
import { ProductDao } from '../../ui/pages/api/product/productDao';
import { userProfileSch } from './UserProfileSch';
import { UserProfileDoc } from './UserProfileDoc';
import * as securitySettings from '../security/settings';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
// endregion

export const avaliableOffLineOnClient = true;


export class UserProfileDao extends ProductDao {
  constructor() {
    super('userprofile', userProfileSch, new UserProfileDoc(), avaliableOffLineOnClient);

    this.setAccessControlList(securitySettings.getUserProfileAccessControlList('userprofile'));

    // prevents the user from changing their access profile
    this.setRestrictedFields('update', 'userprofile_UpdateOwn', ['roles','email']);

  }


  registrarUserProfileNoMeteor = (userprofile) => {
    if (Meteor.isServer) {
      if (userprofile.password) {
        userprofile._id = Accounts.createUser({
          username: userprofile.username,
          password: userprofile.password,
          email: userprofile.email,
        });
      } else {
        userprofile._id = Accounts.createUser({
          username: userprofile.email,
          email: userprofile.email,
        });
      }
      if (userprofile.roles) {
        Roles.addUsersToRoles(userprofile._id, userprofile.roles);
      } else {
        Roles.addUsersToRoles(userprofile._id, 'Usuario');
      }
    }
  };

  insert(dataObj) {
    dataObj = this.checkDataBySchema(dataObj, 'insert');

    try {
      this.registrarUserProfileNoMeteor(dataObj);
      if (!dataObj.roles) {
        dataObj.roles = ['Usuario'];
      } else if (dataObj.roles.indexOf('Usuario') === -1) {
        dataObj.roles.push('Usuario');
      }


      const result = this.collectionInstance.insert(dataObj);
      return result;
    } catch (mongoError) {
      const error = this.mongoErrorToException(mongoError, 'insert');
      throw error || mongoError;
    }
  }
}

