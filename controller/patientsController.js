const { where } = require("sequelize");
const Patients = require("../models/patients");
// methods for create, delete, search and update patients
module.exports = {
  // create patient
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
  //  search patient
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
  // update patient
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
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    return res.json(updatedPatient);
  },
  // delete patient
  async delete(req, res) {
    try {
      const id = req.params.id;
      const patient = await Patients.findByPk(id);

      if (!patient) {
        return res.status(404).send("Paciente não encontrado");
      }

      await patient.destroy();
      res.send("Paciente deletado com sucesso");
    } catch (error) {
      console.error("Erro ao tentar deletar o paciente:", error);
      res.status(500).send("Erro interno do servidor");
    }
  },
  // seach all patients
  async list(req, res) {
    try {
      console.log("Buscando pacientes...");
      const patients = await Patients.findAll();

      return res.json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      return res.status(500).json({ error: "Erro ao buscar pacientes" });
    }
  },
};
