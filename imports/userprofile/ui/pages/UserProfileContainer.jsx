import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { userprofileMdl } from '../../api/UserProfileMdl';
import { UserProfileList } from './UserProfileList';
import { UserProfileEdit } from './UserProfileEdit';
import { UserProfileView } from './UserProfileView';
import FormGenerator from '../../../libs/formGenerator';

const userprofileFormGenerator = new FormGenerator(userprofileMdl);

export const UserProfileContainer = props => {
  const validState = ['view', 'edit', 'create'];

  const screenState =
    props.match && props.match.params && !!props.match.params.screenState
      ? props.match.params.screenState
      : undefined;

  const id =
    props.match && props.match.params && !!props.match.params.userprofileId
      ? props.match.params.userprofileId
      : undefined;

  if (!!screenState && validState.indexOf(screenState) !== -1) {
    if (screenState === 'view' && !!id) {
      return <UserProfileViewContainer {...props} id={id} />;
    } else if (screenState === 'edit' && !!id) {
      return <UserProfileEditContainer {...props} id={id} />;
    } else if (screenState === 'create') {
      return <UserProfileEditContainer {...props} create />;
    }
  } else {
    return <UserProfileListContainer {...props} />;
  }
};

const UserProfileListContainer = withTracker(props => {
  const userprofileHandle = userprofileMdl.subscribe('default', {}, {});
  const loading = !userprofileHandle.ready();
  const userProfile = userprofileHandle.ready() ? userprofileMdl.find().fetch() : [];
  return {
    loading,
    store: props.store,
    userProfile,
    removeUserProfile: data => {
      return userprofileMdl.remove(data, (e, r) => {
        if (!e) {
          props.openSnackBar('Removido com sucesso', 'success');
          props.history.push('/userprofile');
        } else {
          props.openSnackBar(`Erro na remoção:${e}`, 'success');
        }
      });
    },
  };
})(UserProfileList);

const UserProfileViewContainer = withTracker(props => {
  const userprofileHanlde = userprofileMdl.subscribe('default', {}, {});
  const loading = !userprofileHanlde.ready();
  const userprofile = props.id ? userprofileMdl.findOne({ _id: props.id }) : {};
  const userprofileExists = !loading && !!userprofile;
  return {
    loading,
    store: props.store,
    userprofile,
    userprofileExists,
    userprofileFormGenerator,
  };
})(UserProfileView);

const UserProfileEditContainer = withTracker(props => {
  const userprofileHanlde = userprofileMdl.subscribe('default', {}, {});
  const loading = !userprofileHanlde.ready();
  const userprofile = props.id ? userprofileMdl.findOne({ _id: props.id }) : {};
  const userprofileExists = !loading && !!userprofile;

  return {
    loading,
    store: props.store,
    userprofile,
    userprofileExists,
    userprofileFormGenerator,
    // ToDo Tomar cuidado com o uso da variável abaixo devido as Closures
    salvarUserProfile: data => {
      if (Meteor.status().connected) {
        userprofileMdl.upsert(data, (e, r) => {
          if (!e) {
            // console.log('Response:',r);

            if (data._id) {
              props.openSnackBar('Atualizado com sucesso', 'success');
            } else {
              props.openSnackBar('Criado com sucesso', 'success');
            }

            if (!!data._id || (!!r && typeof r === 'string')) {
              props.history.push(`/userprofile/view/${data._id || r}`);
            } else {
              props.history.push('/userprofile');
            }
          } else {
            props.openSnackBar(`Erro na inserção:${e}`, 'danger');
          }
        });
      } else {
        userprofileMdl.upsert(data);
        props.openSnackBar(
          'Problema com a conexão. O dado será atualizado quando a conexão com o servidor for restabelecida.',
          'info'
        );
        if (data._id) {
          props.history.push(`/userprofile/view/${data._id}`);
        } else {
          props.history.push('/userprofile');
        }
      }
    },
  };
})(UserProfileEdit);
