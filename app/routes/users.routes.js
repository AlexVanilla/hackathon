const router = require("express").Router()
const usersControllerFactory = require("../controllers/users.controller.js")

// const usersApiPrefix = "/api/users"

module.exports = apiPrefix => {
    const usersController = usersControllerFactory(apiPrefix)

    router.get("/", usersController.read)
    router.post("/", usersController.create)
    router.post('/login', usersController.login)
    router.get('/:id([0-9a-fA-F]{24})', usersController.readById)
    return router
}
