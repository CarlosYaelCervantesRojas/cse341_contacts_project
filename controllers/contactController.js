const contactModel = require('../models/contactModel');

const { ObjectId } = require('mongodb');


async function getAll(req, res) {
  const result = await contactModel.getAll()

  res
    .setHeader('Content-Type', 'application/json')
    .status(result.status);

  return res.json(result);
}

async function getByID(req, res) {
  const id = req.params.id;
  const _id = ObjectId.createFromHexString(id);
  const result = await contactModel.getByID(_id);

  res
    .setHeader('Content-Type', 'application/json')
    .status(result.status);

  return res.json(result);
}

async function createContact(req, res) {
  const newContact = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday
  } = req.body;

  const result = await contactModel.createContact(newContact);

  res
    .setHeader('Content-Type', 'application/json')
    .status(result.status);
  
  return res.json(result);
}

async function updateContact(req, res) {
  const updatedData = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday
  } = req.body;
  const id = req.params.id;
  const _id = ObjectId.createFromHexString(id);

  const data = await contactModel.getByID(_id);
  if (!data.success) {
    return res.status(data.status).json(data);
  }

  const result = await contactModel.updateContact(_id, updatedData);

  res
    .setHeader('Content-Type', 'application/json')
    .status(result.status);

  return res.json(result);
}

async function deleteContact(req, res) {
  const id = req.params.id;
  const _id = ObjectId.createFromHexString(id);

  const data = await contactModel.getByID(_id);
  if (!data.success) {
    return res.status(data.status).json(data);
  }

  const result = await contactModel.deleteContact(_id);

  res
    .setHeader('Content-Type', 'application/json')
    .status(result.status);

  return res.json(result);
}

module.exports = {
  getAll,
  getByID,
  createContact,
  updateContact,
  deleteContact
};
