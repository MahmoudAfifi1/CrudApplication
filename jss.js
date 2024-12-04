var SelectedRow = null;

// Show Alerts
function ShowAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear Fields
function ClearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // Validate
    if (firstName === "" || lastName === "" || rollNo === "") {
        ShowAlerts("Please fill all fields", "danger");
    } else {
        if (SelectedRow === null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>`;
            list.appendChild(row);
            ShowAlerts("Student Added", "success");
        } else {
            SelectedRow.children[0].textContent = firstName;
            SelectedRow.children[1].textContent = lastName;
            SelectedRow.children[2].textContent = rollNo;
            ShowAlerts("Student Info Edited", "info");
            SelectedRow = null;
        }
        ClearFields();
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        SelectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = SelectedRow.children[0].textContent;
        document.querySelector("#lastName").value = SelectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = SelectedRow.children[2].textContent;
    }
});

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        ShowAlerts("Student Data Deleted", "danger");
    }
});