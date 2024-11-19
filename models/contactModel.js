const mongodb = require('../database');
const statusCodes = require('../utilities/statusCodes');

const db = process.env.DATABASE_NAME;
const collection = process.env.CONTACTS_COLLECTION;

async function getAll() {
  let status;
  let success;
  let data;
  let error;

  try {
    const client = mongodb.getClient();
    const contactList = await client.db(db).collection(collection).find().toArray();

    status =  statusCodes.ok;
    success = true;
    data = contactList;

  } catch (error) {
    console.error('Error fetching contacts:', error);

    status = statusCodes.internalServerError;
    success = false;
    error = { message: 'Error fetching contacts.' }
  } finally {
    return {
      status,
      success,
      data,
      error
    }
  }
}

async function getByID(_id) {
  let status;
  let success;
  let data;
  let error;

  try {
    const client = mongodb.getClient();
    const contact = await client.db(db).collection(collection).findOne({ _id });

    status = contact ? statusCodes.ok : statusCodes.notFound;
    success = !!contact;
    data = contact || undefined;
    error = contact ? undefined : { message: 'Contact not found.' };

  } catch (error) {
    console.error('Error fetching contact:', error);

    status = statusCodes.internalServerError;
    success = false;
    error = { message: 'Error fetching contact.' };
  } finally {
    return {
      status,
      success,
      data,
      error
    }
  }
}

async function createContact(newContact) {
  let status;
  let success;
  let data;
  let error;

  try {
    const client = mongodb.getClient();
    const result = await client.db(db).collection(collection).insertOne(newContact);

    status = statusCodes.created;
    success = true;
    data = { newContact_id: result.insertedId };
   
  } catch (error) {
    console.error('Error creating contact:', error);
    
    status = statusCodes.internalServerError;
    success = false;
    error = { message: 'Error creating new contact.' }
  } finally {
    return {
      status,
      success,
      data,
      error
    }
  }
}

async function updateContact(_id, updatedData) {
  let status;
  let success;
  let data;
  let error;

  try {
    const client = mongodb.getClient();
    const result = await client.db(db).collection(collection).updateOne({ _id },{
      $set: {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        favoriteColor: updatedData.favoriteColor,
        birthday: updatedData.birthday
      }
    });

    
    status = result.modifiedCount ? statusCodes.noContent : statusCodes.ok;
    success = true;
    data = result.modifiedCount ? {} : { message: 'No changes: the submitted values match the current data.' };

  } catch (error) {
    console.error('Error updating contact:', error);

    status = statusCodes.internalServerError;
    success = false;
    error = { message: 'Error updating contact.' };
  } finally {
    return {
      status,
      success,
      data,
      error
    }
  }
}

async function deleteContact(_id) {
  let status;
  let success;
  let data;
  let error;

  try {
    const client = mongodb.getClient()
    const result = await client.db(db).collection(collection).deleteOne({ _id });
    
    status = statusCodes.noContent;
    success = !!result.deletedCount;
    
  } catch (error) {
    console.error('Error deleting contact:', error);

    status = statusCodes.internalServerError;
    success = false;
    error = { message: 'Error deleting contact.' };
  } finally {
    return {
      status,
      success,
      data,
      error
    }
  }
}

module.exports = {
    getAll,
    getByID,
    createContact,
    updateContact,
    deleteContact
}