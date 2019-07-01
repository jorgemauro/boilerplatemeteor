export const getUserProfileAccessControlList = apiName => {
  return {
    view: {
      access: [
        'Administrador',
        `${apiName}_View`,
        `${apiName}_ViewOwn`,
        `${apiName}_Update`,
        `${apiName}_UpdateOwn`,
        `${apiName}_Remove`,
        `${apiName}_RemoveOwn`,
      ],
      fields: {
        onlyMine: {
          roles: [
            `${apiName}_ViewOwn`,
            `${apiName}_UpdateOwn`,
            `${apiName}_RemoveOwn`,
          ],
          field: '_id', // createUserId is the default
        },
      },
    },
    update: {
      access: [
        'Administrador',
        `${apiName}_Update`,
        `${apiName}_UpdateOwn`,
        `${apiName}_Remove`,
        `${apiName}_RemoveOwn`,
      ],
      fields: {
        onlyMine: {
          roles: [`${apiName}_UpdateOwn`, `${apiName}_RemoveOwn`],
          field: '_id', // createUserId is the default
        },
      },
    },
    insert: {
      access: ['Administrador', `${apiName}_Insert`],
    },
    remove: {
      access: ['Administrador', `${apiName}_Remove`, `${apiName}_RemoveOwn`],
      fields: {
        onlyMine: {
          roles: [`${apiName}_RemoveOwn`],
          field: '_id', // createUserId is the default
        },
      },
    },
  };
};

