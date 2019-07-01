import React from 'react';
import { Flex, Box } from 'reflexbox';
import WebERForm from '../../../ui/components/weberform';
import PageLayout from '../../../ui/layouts/pageLayout/pageLayout';

export const UserProfileView = props => {
  const userprofile = props.userprofile || {};

  const userProfileSchema = props.userprofileFormGenerator.getFormSchema('default');

  //Test VisibilityFunction
  //userProfileSchema.username.visibilityFunction = (doc)=>doc&&doc['language']==='pt-BR';


  const acoes = [
    {
      name: ()=>i18n.__('app.general_actions.back'),
      buttonProps: {
        variant: 'raised',
        color: 'secondary',
        onClick: () => {
          props.history.push('/userprofile');
        },
      },
    },
    {
      name: ()=>i18n.__('app.general_actions.edit'),
      buttonProps: {
        variant: 'raised',
        color: 'primary',
        onClick: () => {
          props.history.push(`/userprofile/edit/${props.id}`);
        },
      },
    },
  ];

  return (
    <div>
      <PageLayout
        cardTitle={i18n.__('app.modules.userprofile.view_title')}
        cardSubtitle={i18n.__('app.modules.userprofile.view_subtitle')}
        context={props}
        backRoute={() => {
          return props.history.push('/userprofile');
        }}
        content={
          <div>
            <Flex align="center" justify="center">
              <Box w={1}>
                <Flex justify="center" align="center" wrap>
                  <Box w={1}>
                    <WebERForm
                      mode={'view'}
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
