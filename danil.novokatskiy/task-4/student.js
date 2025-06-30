"use strict"

import {Student} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  let students = [];

  const savedStudents = localStorage.getItem("students");
  if (savedStudents) {
    students = JSON.parse(savedStudents);
  }

  const addStudentBtn = document.querySelector("#add-student-btn");
  addStudentBtn.addEventListener("click", async () => {
    const id = +document.getElementById("ID").value;
    const name = document.getElementById("Name").value;

    if (!name || !id) {
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

    if (!id) {
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

  function addStudent(id, name) {
    return new Promise(() => {
      setTimeout(() => {
        try {
          if (students.some(student => student.id === id)) {
            throw new Error("Student already exists");
          }
          const newStudent = new Student(id, name);
          students.push(newStudent);
          saveStudentsToLocalStorage();
          alert("Student added successfully");
        } catch (err) {
          alert(err);
        }
      }, 1000)
    })
  }

  function deleteStudent(id) {
    return new Promise(() => {
      setTimeout(() => {
        try {
          const index = students.findIndex(student => student.id === id);
          if (index === -1) {
            throw new Error("Student is found by this id");
          }
          const deletedStudent = students.splice(index, 1)[0];
          saveStudentsToLocalStorage();
          alert("Student deleted");
        } catch (err) {
          alert(err);
        }
      }, 1000)
    })
  }
});



