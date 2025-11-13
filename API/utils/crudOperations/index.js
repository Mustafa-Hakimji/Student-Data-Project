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

    const addedData = await model.create(data);

    return { data: addedData, result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error };
  }
};

const deleteData = async ({ model, field, value }) => {
  try {
    const deletedDoc = await model.findOneAndDelete({ [field]: value });

    if (!deletedDoc) {
      // No match found
      return null;
    }

    // Successfully deleted
    return deletedDoc;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error; // Let the route handler catch this
  }
};

module.exports = { addNewData, deleteData };
