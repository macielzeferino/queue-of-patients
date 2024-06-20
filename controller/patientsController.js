const { where } = require("sequelize");
const Patients = require ("../models/patients")

module.exports = {
  async store (req, res) {
    const {name, sex } = req.body;

    const patients = await Patients.create({name, sex});
    return res.json(patients);
  },

  async index(req, res) {
    const patients = await Patients.findAll();

    return res.json(patients);
  },

  async put (req, res ) {
    const {name, size, sex} = req.body;
    await Patients.update (
      {name, size, sex},
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