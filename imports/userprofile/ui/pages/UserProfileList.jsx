import React from 'react';
import { Flex, Box } from 'reflexbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PageLayout from '../../../ui/layouts/pageLayout/pageLayout';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export const UserProfileList = props => {
  return (
    <div>
      <PageLayout
        cardTitle={i18n.__('app.modules.userprofile.list_title')}
        cardSubtitle={i18n.__('app.modules.userprofile.list_subtitle')}
        context={props}
        content={
          <Card>
            <Flex align="center" justify="center">
              <Box w={1}>
                <List style={{ padding: 0, backgroundColor: 'white' }}>
                  {props.userProfile.map(userprofile => {
                    return (
                      <div>
                        <ListItem
                          key={userprofile.username}
                          role={undefined}
                          dense
                          button
                          onClick={() => {
                          props.history.push(`/userprofile/view/${userprofile._id}`);
                        }}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                style={{ marginBottom: 0 }}
                                gutterBottom
                              >
                                {userprofile.username}
                              </Typography>
                          }
                            secondary={
                              <Typography
                                variant="body1"
                                className="textOverflow"
                                gutterBottom
                              >
                                {userprofile.email}
                              </Typography>
                          }
                          />

                          {userprofile.OFFLINE ? (
                            <span
                              style={{
                              color: '#FF0000',
                              fontSize: 10,
                              marginRight: 30,
                            }}
                            >{` (${userprofile.OFFLINE})`}
                            </span>
                        ) : null}

                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => {
                              const actions = [
                                {
                                  actionText: () => {
                                                     return i18n.__('app.general_actions.no');
                                                    },
                                  actionColor: 'secondary',
                                },
                                {
                                  actionText: () => {
                                                       return i18n.__('app.general_actions.yes');
                                                      },
                                  actionOnClick: () => {
                                    return props.removeUserProfile(userprofile);
                                  },
                                  actionColor: 'primary',
                                },
                              ];

                              props.openDialog(
                                i18n.__('app.general_actions.delete'),
                                i18n.__('app.modules.userprofile.delete_userprofile_message', { name: userprofile.nome }),
                                actions
                              );
                            }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>

                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </Box>
            </Flex>
          </Card>
        }
      />
      <Button
        style={{ position: 'fixed', bottom: 25, right: 25 }}
        variant="fab"
        color="primary"
        onClick={() => {
          return props.history.push('/userprofile/create');
        }}
      >
        <AddIcon />
      </Button>
    </div>
  );
};
