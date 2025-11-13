const getCommonError = (exeptionIn) => {
  return `Some exeption occured ${exeptionIn}.`;
};

const getNotFound = (entity) => {
  return `${entity} Not found.`;
};

const getAddMessage = (entity) => {
  return `${entity} addedd successfully.`;
};

const getDataFound = (entity) => {
  return `${entity} found successfully.`;
};

module.exports = { getCommonError, getNotFound, getAddMessage, getDataFound };
