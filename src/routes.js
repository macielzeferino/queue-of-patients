const express = require("express");
const routes = express.Router();
const cors = require("cors")
routes.use(cors());
const patientsController = require("../controller/patientsController")


routes.post("/patients", patientsController.store);
routes.get("/patients/:id", patientsController.index);
routes.get("/patients", patientsController.list);
routes.put("/patients/:id", patientsController.put);
routes.delete("/patients/:id", patientsController.delete);


module.exports = routes;