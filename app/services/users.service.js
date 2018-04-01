const mongodb = require("../mongodb")
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
  create: _create,
  read: read,
  readById: readById,
  login: _login
}

function read() {
  return conn
    .db()
    .collection("users")
    .find({})
    .toArray()
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        let user = users[i]
        user._id = user._id.toString()
      }
      return users
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

function readById(id){
    return conn.db().collection('users').findOne({ _id: new ObjectId(id) })
        .then(user => {
            user._id = user._id.toString()
            return user
        })
        .catch(err => {
        console.warn(err)
        return Promise.reject(err)
    })
}

function _create(payload) {
  console.log(payload)
  const doc = {
    username: payload.username,
    password: payload.password
  }

  return conn
    .db()
    .collection("users")
    .insertOne(doc)
    .then(result => result.insertedId.toString())
    .catch(err => {
      return Promise.reject(err)
    })
}

function _login(username, password) {
    return conn.db().collection("users").findOne({ username: username, password: password })
      .then(user => {
        user._id = user._id.toString()
        return user
      })
      .catch(err => {
        console.warn(err)
        return Promise.reject(err)
      })
  }