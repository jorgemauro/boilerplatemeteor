// region Imports
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { ProductMdl } from '../../api/product/productMdl';
import { UserProfileDao } from './UserProfileDao';
// endregion

class UserProfileMdl extends ProductMdl {
    constructor() {
        const dao = new UserProfileDao();
        super(dao);
        this.addPublicationMeteorUsers();
        this.addUserProfileProfilePublication();
        this.mtInsert = this.mtInsert.bind(this);
        this.afterInsert = this.afterInsert.bind(this);
        this.beforeInsert = this.beforeInsert.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.beforeUpdate = this.beforeUpdate.bind(this);
        this.beforeRemove = this.beforeRemove.bind(this);
        this.callMethod = this.callMethod.bind(this);


        if (!Meteor.isClient) {
            this.registerMethod('sendVerificationEmail', userData => {
                check(userData, Object);
                if (Meteor.isServer && userData) {
                    if (userData._id) {
                        Accounts.sendVerificationEmail(userData._id);
                    } else if (userData.email) {
                        const user = Meteor.users.findOne({
                            'emails.address': userData.email,
                        });
                        Accounts.sendVerificationEmail(user._id);
                    }
                }
            });
            this.registerMethod('sendResetPasswordEmail', userData => {
                check(userData, Object);
                if (Meteor.isServer && userData) {
                    if (userData._id) {
                        Accounts.sendResetPasswordEmail(userData._id);
                    } else if (userData.email) {
                        const user = Meteor.users.findOne({
                            'emails.address': userData.email,
                        });
                        if (user) {
                            Accounts.sendResetPasswordEmail(user._id);
                        } else {
                            return false;
                        }
                    }
                }
                return true;
            });
            this.registerMethod('addUserProfileWithoutPassword', params => {
                check(params, {
                    email: String,
                    roles: String,
                    nome: String,
                });
                const {
                    email, roles, nome,
                } = params;
                const userProfile = {
                    nome,
                    email,
                };
                let userId;
                if (Meteor.isServer) {
                    userId = Accounts.createUser({
                        email,
                        password: '',
                        username: nome,
                    });
                    Accounts.sendEnrollmentEmail(userId);
                    Roles.addUsersToRoles(userId, roles);
                }
                Meteor.users.update(userId, {
                    $set: {
                        userProfile,
                    },
                });
            });
        }
    }

    addPublicationMeteorUsers = () => {
        if (Meteor.isServer) {
            Meteor.publish('statusCadastroUserProfile', userId => {
                check(userId, String);
                if (Roles.userIsInRole(userId, 'Administrador')) {
                    return Meteor.users.find(
                        {},
                        {
                            fields: {
                                _id: 1,
                                username: 1,
                                'emails.verified': 1,
                                'emails.address': 1,
                                roles: 1,
                                productProfile: 1,
                            },
                        }
                    );
                }
                return Meteor.users.find({ _id: userId });
            });
            Meteor.publish('user', function () {
                if (this.userId) {
                    return Meteor.users.find(
                        { _id: this.userId },
                        {
                            fields: {
                                emails: 1,
                                username: 1,
                            },
                        }
                    );
                }
                return this.ready();
            });
        }
    };

    addUserProfileProfilePublication = () => {
        if (Meteor.isServer) {
            // eslint-disable-next-line
            Meteor.publish('userprofile-profile', function () {
                if (this.userId) {
                    return Meteor.users.find(
                        { _id: this.userId },
                        {
                            fields: {
                                'emails.address': 1,
                                productProfile: 1,
                            },
                        }
                    );
                }
                this.ready();
            });
        }
    };

    beforeInsert(docObj, context) {
        return super.beforeInsert(docObj, context);
    }

    afterInsert(doc) {
        if (Meteor.isServer) {
            if (doc.password) {
                Accounts.sendVerificationEmail(doc._id);
            } else {
                Accounts.sendEnrollmentEmail(doc._id);
            }
        }
    }

    mtInsert(dataObjArg, context) {
        return super.mtInsert(dataObjArg, context);
    }

    beforeUpdate(docObj, context) {
        return super.beforeUpdate(docObj, context);
    }

    afterUpdate(doc) {
        doc && doc.roles && Roles.setUserRoles(doc._id, doc.roles);
        const userLangague = doc && doc.language ? doc.language : 'en-US';
        i18n.setLocale(userLangague);
    }


    beforeRemove(docObj, context) {
        super.beforeRemove(docObj, context);
        Meteor.users.remove({ _id: docObj._id });
        return true;
    }

    insertError(user) {
        if (Meteor.isClient) {
            // cliente.saveCancel(); //#ToDo
        }
        if (Meteor.isServer && user._id) {
            Meteor.users.remove(user._id);
        }
    }
}

export const userprofileMdl = new UserProfileMdl();
