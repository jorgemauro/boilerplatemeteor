import React from 'react';
import { Flex, Box } from 'reflexbox';
import WebERForm from '../../../ui/components/weberform';
import PageLayout from '../../../ui/layouts/pageLayout/pageLayout';


export const UserProfileEdit = props => {

  const userprofile = props.userprofile || {};

  const userProfileSchema = props.userprofileFormGenerator.getFormSchema(props.create?'insert':'update');

  //Test VisibilityFunction
  //userProfileSchema.username.visibilityFunction = (doc)=>doc&&doc['language']==='pt-BR';

  const acoes = [
    {
      name: ()=>i18n.__('app.general_actions.cancel'),
      buttonProps: {
        variant: 'raised',
        color: 'secondary',
        textColor: '#ffffff',
        key:'cancel',
        onClick: (doc, form) => {
          if (props.create) {
            props.history.push('/userprofile');
          } else {
            props.history.push(`/userprofile/view/${props.id}`);
          }
        },
      },
    },
    {
      name: ()=>i18n.__('app.general_actions.save'),
      buttonProps: {
        variant: 'raised',
        color: 'primary',
        key:'save',
        onClick: (doc, form) => {
          if (form.validate()) {
            props.salvarUserProfile(doc);
            props.history.push(`/userprofile/view/${props.id}`);
          }
        },
      },
    },
  ];

  return (
    <div>
      <PageLayout
        cardTitle={i18n.__('app.modules.userprofile.edit_title')}
        cardSubtitle={i18n.__('app.modules.userprofile.edit_subtitle')}
        context={props}
        backRoute={() => {
          if (props.create) {
            props.history.push('/userprofile');
          } else {
            props.history.push(`/userprofile/view/${props.id}`);
          }
        }}
        content={
          <div>
            <Flex align="center" justify="center">
              <Box w={1}>
                <Flex justify="center" align="center" wrap>
                  <Box w={1}>
                    <WebERForm
                      mode={'edit'}
                      flexBoxProps={{
                        column: true,
                      }}
                      ref={userprofileFormData => {
                        this.userprofileFormData = userprofileFormData;
                      }}
                      doc={userprofile}
                      formSchema={userProfileSchema}
                      actions={acoes}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </div>
        }
      />
    </div>
  );
};
