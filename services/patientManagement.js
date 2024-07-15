document.addEventListener("DOMContentLoaded", () => {
  // Show Add Patient Form
  document.querySelector(".btn-add").addEventListener("click", () => {
    const form = document.querySelector("#formAdd");
    form.classList.remove("hidden");
  });

  // Add Patient
  document.querySelector("#formData").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const patientData = {
      name: name,
      status: status,
      sex: sex,
    };

    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        document.querySelector("#formAdd").classList.add("hidden");
        document.querySelector("#formData").reset(); // Clear form inputs
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  // Show Remove Patient Form
  document.querySelector(".btn-delete").addEventListener("click", () => {
    const form = document.querySelector("#formDelete");
    form.classList.remove("hidden");
  });

  // Remove Patient
  document.querySelector("#input-delete").addEventListener("submit", (event) => {
    event.preventDefault();
    const idPatient = document.querySelector("#idPatient").value;
    if (idPatient === "") {
      return;
    }

    fetch(`http://localhost:3000/patients/${idPatient}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success", result);
        alert(`Paciente de id ${idPatient} deletado`);
        document.querySelector("#formDelete").classList.add("hidden");
        document.querySelector("#input-delete").reset(); // Clear form inputs
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        alert("Erro ao deletar paciente");
      });
  });

  // Show View Patient Form
  document.querySelector(".btn-view").addEventListener("click", () => {
    const form = document.querySelector("#formView");
    form.classList.remove("hidden");
  });

  // View Patient
  // View Patient
document.querySelector("#input-view").addEventListener("submit", (event) => {
  event.preventDefault();
  const idView = document.querySelector("#idView").value;
  if (idView === "") {
    return;
  }

  fetch(`http://localhost:3000/patients/${idView}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((result) => {
    console.log("Resultado da requisição:", result);
    if (result && result.name && result.status && result.sex) {
      console.log("Success:", result);
      const patientInfo = `
        Paciente encontrado:<br>
        Nome: ${result.name}<br>
        Status: ${result.status}<br>
        Sexo: ${result.sex}
      `;
      document.querySelector("#patientInfo").innerHTML = patientInfo;
      document.querySelector(".modal").classList.remove("hidden");
      document.querySelector("#input-view").reset(); // Limpar os campos do formulário
    } else {
      alert("Paciente não encontrado");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
});



  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar formulário de atualização
    document.querySelector(".btn-update").addEventListener("click", () => {
      const form = document.querySelector("#formUpdate");
      form.classList.remove("hidden");
    });
  
    // Atualizar paciente
    document.querySelector("#formUpdate").addEventListener("submit", (event) => {
      event.preventDefault();
      const idUpdate = document.querySelector("#idUpdate").value;
      const nameUpdate = document.querySelector("#nameUpdate").value;
      const statusUpdate = document.querySelector('input[name="statusUpdate"]:checked').value;
      const sexUpdate = document.querySelector('input[name="sexUpdate"]:checked').value;
      const patientUpdateData = {
        name: nameUpdate,
        status: statusUpdate,
        sex: sexUpdate,
      };
  
      fetch(`http://localhost:3000/patients/${idUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientUpdateData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log("Success:", result);
          alert(`Dados do paciente de ID ${idUpdate} atualizados com sucesso`);
          document.querySelector("#formUpdate").classList.add("hidden");
          document.querySelector("#formUpdate").reset(); // Limpar entradas do formulário
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("Erro ao atualizar paciente");
        });
    });
  });
  // Close Modals
  document.querySelectorAll(".close").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest(".modal");
      if (form) {
        form.classList.add("hidden");
        form.querySelector("form").reset(); // Clear form inputs
      }
    });
  });
});
