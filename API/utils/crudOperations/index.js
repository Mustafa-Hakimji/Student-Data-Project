const { USER_NOT_FOUND, USER_DELETED } = require("../constants/appConstants");

const addNewData = async ({ model, data, dupField }) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      if (!data[key]) {
        return { isFieldMissing: true };
      }
    }

    for (let i = 0; i < dupField.length; i++) {
      const curField = dupField[i];
      const isExist = await model.findOne({ [curField]: data[curField] });

      if (isExist) {
        return { isDuplicate: true };
      }
    }

    let addedData;
    if (dupField[0] === "adhaar") {
      addedData = await model.create({ ...data, class: data?.className });
    } else {
      addedData = await model.create({ data });
    }

    return { data: addedData, result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error };
  }
};

const deleteData = async ({ model, field, value }) => {
  try {
    let deletedUser = [];
    for (const i of value) {
      const result = await model.findOneAndDelete({ [field]: i });
      const deleteResult = {
        user: i,
        status: USER_NOT_FOUND,
      };
      if (!result) {
        deletedDoc = null;
        deleteResult.status = USER_NOT_FOUND;
      } else {
        deleteResult.status = USER_DELETED;
      }

      deletedUser.push(deleteResult);
    }

    return deletedUser;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

module.exports = { addNewData, deleteData };
