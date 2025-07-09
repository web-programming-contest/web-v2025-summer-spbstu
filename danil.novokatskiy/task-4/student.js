"use strict"

import {Student} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {


  let students = [];
  const studentsContainer = document.querySelector(".students-list");
  if (!studentsContainer) {
    console.error("No students found.");
    return;
  }

  const savedStudents = localStorage.getItem("students");
  if (savedStudents) {
    students = JSON.parse(savedStudents).map(s => {
      return new Student(s.id, s.name, s.grades || {});
    });
  }

  renderStudents();

  const addStudentBtn = document.querySelector("#add-student-btn");
  addStudentBtn.addEventListener("click", async () => {
    const id = +document.getElementById("ID").value;
    const name = document.getElementById("Name").value;

    if (!name || isNaN(id)) {
      alert("Please enter a valid name or ID");
      return;
    }

    try {
      await addStudent(id, name);
      document.getElementById("ID").value = "";
      document.getElementById("Name").value = "";
    } catch (err) {
      alert(err);
    }
  })

  const deleteStudentBtn = document.querySelector("#delete-student-btn");
  deleteStudentBtn.addEventListener("click", async () => {
    const id = +document.getElementById("ID").value;

    if (isNaN(id)) {
      alert("Please enter a valid id");
      return;
    }

    try {
      await deleteStudent(id);
      document.getElementById("ID").value = "";
      document.getElementById("Name").value = "";
    } catch (err) {
      alert(err);
    }
  })

  function saveStudentsToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
  }

  async function addStudent(id, name) {
    return new Promise(() => {
      setTimeout(() => {
        try {
          if (students.some(student => student.id === id)) {
            throw new Error("Student already exists");
          }
          const newStudent = new Student(id, name);
          students.push(newStudent);
          saveStudentsToLocalStorage();
          renderStudents();
          alert("Student added successfully");
        } catch (err) {
          alert(err);
        }
      }, 1000)
    })
  }

  async function deleteStudent(id) {
    return new Promise(() => {
      setTimeout(() => {
        try {
          const index = students.findIndex(student => student.id === id);
          if (index === -1) {
            throw new Error("Student is found by this id");
          }
          if (confirm("Are you sure you want to delete this student?")) {
            const deletedStudent = students.splice(index, 1)[0];
            saveStudentsToLocalStorage();
            renderStudents();
            alert("Student deleted");
          }
        } catch (err) {
          alert(err);
        }
      }, 1000)
    })
  }

  function renderStudents() {
    studentsContainer.innerHTML = students.map(student => `
    <div class="student-card" data-id="${student.id}">
      <h3>${student.name} (ID: ${student.id})</h3>
      <p>Средний балл: <strong>${student.getAverageGrade() || "Нет оценок"}</strong></p>
      <div class="grades-container">
        <h4>Предметы:</h4>
        ${Object.entries(student.grades || {}).map(([subject, grades]) => `
          <div class="grade-item">
            <span>${subject}: ${grades.join(', ')}</span>
          </div>
        `).join('')}
        <div class="add-grade-form">
          <input type="text" autocomplete="on" placeholder="Новый предмет" class="new-subject">
          <select class="new-grade-select">
            <option value="">Выберите оценку</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="add-grade-btn">Добавить</button>
          <button class="delete-grade-btn">Удалить</button>
        </div>
      </div>
    </div>
  `).join('');

    document.querySelectorAll(".grade-select").forEach(select => {
      select.addEventListener("change", async e => {
        const id = parseInt(e.target.closest(".student-card").dataset.id);
        const subject = e.target.dataset.subject;
        const grade = e.target.dataset.value ? parseInt(e.target.dataset.value) : null;

        await upgradeGrade(id, subject, grade);
      })
    })

    document.querySelectorAll('.delete-grade-btn').forEach(btn => {
      btn.addEventListener("click", async e => {
        const studentCard = e.target.closest(".student-card");
        const id = parseInt(studentCard.dataset.id);
        const newSubject = studentCard.querySelector(".new-subject");
        const newGrade = studentCard.querySelector(".new-grade-select");

        const subject = newSubject.value.trim();
        const grade = newGrade.value ? parseInt(newGrade.value) : null;
        try {
          await deleteGrade(id, subject, grade);
          newSubject.value = "";
          newGrade.value = "";
        } catch (e) {
          alert(e);
        }
      })
    })

    document.querySelectorAll(".add-grade-btn").forEach(btn => {
      btn.addEventListener("click", async e => {
        const studentCard = e.target.closest(".student-card");
        const id = parseInt(studentCard.dataset.id);
        const newSubject = studentCard.querySelector(".new-subject");
        const newGrade = studentCard.querySelector(".new-grade-select");

        const subject = newSubject.value.trim();
        const grade = newGrade.value ? parseInt(newGrade.value) : null;

        try {
          await addGrade(id, subject, grade);
          newSubject.value = "";
          newGrade.value = "";
        } catch (e) {
          alert(e);
        }
      })
    })
  }

  async function upgradeGrade(id, subject, grade) {
    return new Promise( () => {
      setTimeout(() => {
        try {
          const student = students.find(student => student.id === id);
          if (!student) {
            throw new Error("Student is not found by this id");
          }
          if (grade === null || grade === undefined) {
            delete student.grades[subject];
          } else {
            student.grades[subject] = grade;
          }
          saveStudentsToLocalStorage();
          renderStudents();
        } catch (e) {
          alert(e);
        }
      }, 1000)
    })
  }

  async function addGrade(id, subject, grade) {
    return new Promise( () => {
      setTimeout(() => {
        try {
          const student = students.find(student => student.id === id);
          if (!student) {
            throw new Error("Student is not found by this id");
          }
          if (!student.grades[subject]) {
            student.grades[subject] = [];
          }
          student.grades[subject].push(grade);
          saveStudentsToLocalStorage();
          renderStudents();
        } catch (e) {
          alert(e);
        }
      }, 1000)
    })
  }

  async function deleteGrade(id, subject, grade) {
    return new Promise( () => {
      setTimeout(() => {
        try {
          const student = students.find(student => student.id === id);
          if (!student) {
            throw new Error("Student is not found by this id");
          }
          if (!student.grades[subject]) {
            throw new Error("Subject is not found");
          }
          if (confirm("Are you sure you want to delete this grade?")) {
            student.grades[subject] = student.grades[subject].filter(g => g !== grade);
            if (!student.grades[subject].length) {
              delete student.grades[subject];
            }
            saveStudentsToLocalStorage();
            renderStudents();
          }
        } catch (e) {
          alert(e);
        }
      }, 1000)
    })
  }
});

