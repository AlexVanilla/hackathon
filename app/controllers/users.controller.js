"use strict"

const usersService = require("../services/users.service")
let _apiPrefix

module.exports = apiPrefix => {
  _apiPrefix = apiPrefix

  return {
    create: _create,
    read: read,
    readById: readById,
    login: _login
  }
}

function read(req, res) {
  usersService
    .read()
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => res.status(500).send(err))
}

function readById(req, res){
    usersService.readById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(data => {
            res.status(500).json(data)
        })
}

function _create(req, res) {
  usersService
    .create(req.body)
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}

function _login(req, res) {
    usersService.login(req.body.username, req.body.password)
        .then(user => {
            // Check if a user exists and user.isEmailConfirmed is true
            if (user) {
                // Setting a cookie named 'auth' which expires after a year
                res.cookie('auth', { userId: user._id, username: user.username }, { maxAge: 365 * 24 * 60 * 60 * 1000 })
                res.status(200).send()
            } else {
                // NOTE: Keeping error message broad so client won't know if user exist in database or not
                res.status(400).send("Login attempt failed")
                return
            }
        })
        .catch(error => {
            console.warn(error)
            res.status(500).send()
        })
}