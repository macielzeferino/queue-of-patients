const { where } = require("sequelize");
const Patients = require ("../models/patients")

module.exports = {
  async store (req, res) {
    const {name, sex, status } = req.body;

    const patients = await Patients.create({name, sex, status});
    return res.json(patients);
  },

  async index(req, res) {
    const patients = await Patients.findAll();

    return res.json(patients);
  },

  async put (req, res ) {
    const {name, sex, status} = req.body;
    await Patients.update (
      {name, sex, status},
      {
        where : {
          id : req.params.id,
        },
      },
    );
    return res.send("paciente corrigido")
  },

  async delete(req, res ){
    await Patients.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Paciente deletado");
  },
};