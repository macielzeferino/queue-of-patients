const { where } = require("sequelize");
const Patients = require("../models/patients");

module.exports = {
  async store(req, res) {
    try {
      const { name, sex, status } = req.body;
      const patient = await Patients.create({ name, sex, status });

      return res.json(patient);
    } catch (error) {
      console.error("Error creating patient:", error);
      return res.status(500).json({ error: "Failed to create patient" });
    }
  },

  async index(req, res, next) {
    try {
      const { id } = req.params;
      const patient = await Patients.findByPk(id);
      if (!patient) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }
      return res.json(patient);
    } catch (error) {
      next(error);
    }
  },

  async put(req, res) {
    const { name, sex, status } = req.body;
    await Patients.update(
      { name, sex, status },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const updatedPatient = await Patients.findByPk(req.params.id);
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
  
    // Retornar os dados atualizados do paciente como JSON
    return res.json(updatedPatient);
  },

  async delete(req, res) {
    await Patients.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Paciente deletado");
  },
};
