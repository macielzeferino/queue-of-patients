const { where } = require("sequelize");
const Patients = require ("../models/patients")

module.exports = {
  async store(req, res) {
    try {
        const { name, sex, status } = req.body;

        // Cria o paciente no banco de dados
        const patient = await Patients.create({ name, sex, status });

        return res.json(patient);
    } catch (error) {
        console.error('Error creating patient:', error);
        return res.status(500).json({ error: 'Failed to create patient' });
    }
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