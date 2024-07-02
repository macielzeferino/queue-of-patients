//add patient

document.querySelector(".btn-add").addEventListener("click", () => {
  const form = document.querySelector("#formData");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  }
});

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
      document.querySelector("#formData").style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

//remove patient

document.querySelector(".btn-delete").addEventListener("click", () => {
  const form = document.querySelector("#input-delete");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  }
});

document.querySelector(".btn-delete").addEventListener("click", () => {
  const idPatient = document.querySelector("#idPatient").value;
  if (idPatient === "") {
    return;
  }

  fetch(`http://localhost:3000/patients/${idPatient}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "aplication/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((result) => {
      console.log("Sucess", result);
      alert(`Paciente de id ${idPatient} deletado `);
      document.querySelector("#input-delete").style.display = "none";
    })
    .catch((error) => {
      console.error("error fetching data", error);
      alert("erro ao deletar paciente");
    });
  document.querySelector("#idPatient").value = "";
});

// consult patient

document.querySelector(".btn-view").addEventListener("click", () => {
  const form = document.querySelector("#input-view");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  }
});

document.querySelector(".btn-view").addEventListener("click", () => {
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
        alert(
          `Paciente encontrado: Nome: ${result.name}, Status: ${result.status}, Sexo: ${result.sex}`
        );
        document.querySelector("#input-view").style.display = "none";
      } else {
        throw new Error("Dados do paciente incompletos ou incorretos");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Erro ao consultar paciente. Verifique o ID e tente novamente.");
    });
  document.querySelector("#idView").value = "";
});

// patient updated

document.querySelector(".btn-update").addEventListener("click", () => {
  const form = document.querySelector("#input-update");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  }
});

document.querySelector("#updateForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const idUpdate = document.querySelector("#idUpdate").value;
  const nameUpdate = document.querySelector("#nameUpdate").value;
  const sexUpdate = document.querySelector("#sexUpdate").value;
  const statusUpdate = document.querySelector("#statusUpdate").value;

  const updatedData = {
    name: nameUpdate,
    sex: sexUpdate,
    status: statusUpdate,
  };

  fetch(`http://localhost:3000/patients/${idUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log("Paciente atualizado:", result);
      alert(`Paciente de ID ${idUpdate} atualizado com sucesso.`);
      // Pode realizar outras ações após a atualização, se necessário
    })
    .catch((error) => {
      console.error("Erro ao atualizar paciente:", error);
      alert(
        "Erro ao atualizar paciente. Verifique os dados e tente novamente."
      );
    });
});
