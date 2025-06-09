const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#entriesTable tbody");
  const dobInput = document.getElementById("dob");

  // DOB validation: 18 to 55 years old
  function isAgeValid(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      return age - 1;
    }
    return age;
  }

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    tableBody.innerHTML = "";
    entries.forEach(entry => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptedTerms}</td>
      `;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const age = isAgeValid(dob);
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    const entry = { name, email, password, dob, acceptedTerms };
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    loadEntries();
    form.reset();
  });

  // Load entries on page load
  window.addEventListener("DOMContentLoaded", loadEntries);
