import * as securitySettings from '../../security/settings'

export const userProfileSch = {
  photo: {
    type: String,
    label:'Photo',
    defaultValue: '',
    optional: true,
    isImage:true,
    isAvatar:true,
  },
  username: {
    type: String,
    label:'User Name',
    defaultValue: '',
  },
  email: {
    type: String,
    label:'Email',
    defaultValue: '',
  },
  roles: {
    type: [String],
    label:'Access Profile',
    defaultValue: [],
    optional: true,
    componentName: 'ChipSelect',
    options: Object.keys(securitySettings.mapRolesToAccessControlList)
      .map(field=>{
        return {value:field,label:field}
      }),

  },
  language: {
    type: String,
    label:'Language',
    defaultValue: '',
    optional: true,
    options: [
      {value:'en-US',label:'English'},
      {value:'pt-BR',label:'Portuguese'},
    ],
  },
};
