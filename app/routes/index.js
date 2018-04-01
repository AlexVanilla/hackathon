"use strict"

const express = require("express")

const router = require("express").Router()
const clientRoutes = require("./client.routes")
const authenticate = require("../filters/authenticate")

const quizApiPrefix = "/api/quizzes"
const quizRoutes = require("./quiz.routes")(quizApiPrefix)

const usersApiPrefix = "/api/users"
const usersRoutes = require("./users.routes")(usersApiPrefix)

const path = require("path")
const contentPath = path.join(__dirname, "../../content")

module.exports = router

// check authentication for all requests
router.use(express.static(contentPath))
router.use(authenticate)

// API routes (group routing modules here - no empty lines between)
router.use(quizApiPrefix, quizRoutes)
router.use(usersApiPrefix, usersRoutes)
// router.use('/api/entities', entitiesRoutes)
// router.use('/api/examples', examplesRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router)

// register client routes
router.use(clientRoutes)

function useAPIErrorHandlers(router) {
  // Handle API 404
  router.use("/api/*", (req, res, next) => {
    res.sendStatus(404)
  })

  // Handle API 500
  router.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next()
    }

    // Log it
    console.error(err.stack)

    // Redirect to error page
    res.sendStatus(500)
  })
}
