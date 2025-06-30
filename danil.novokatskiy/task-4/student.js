// function addStudent() {
//   const id = document.getElementById('ID');
//   const name = document.getElementById('Name');
//   alert(name + "added student");
//   console.log(name)
// }

document.addEventListener("DOMContentLoaded", () => {

  let students = [];

})

let students = [];
const savedStudents = localStorage.getItem("students");
if (savedStudents) {
  students = JSON.parse(savedStudents);
}

const addStudentBtn = document.querySelector("#add-student-btn");
addStudentBtn.addEventListener("click", () => {
  const name = document.getElementById("Name").value;
  const id = document.getElementById("ID").value;
  console.log(`Name: ${name}, ID: ${id}`);
})

const deleteStudentBtn = document.querySelector("#delete-student-btn");
deleteStudentBtn.addEventListener("click", () => {

})

function saveStudentsToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent(id, name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (students.some(student => student.id === id)) {
          throw new Error("Student already exists");
        }
        const newStudent = {
          ID: id,
          name: name,
          grades: {}
        }
        students.push(newStudent);
        saveStudentsToLocalStorage()
        resolve(`Student ${name} was added successfully!`);

      } catch (err) {
        reject(err);
      }
    }, 1000)
  })
}

function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const index = students.findIndex(student => student.id === id);
        if (index === -1) {
          throw new Error("Student is found by this id");
        }
        const deletedStudent = students.splice(index, 1)[0];
        saveStudentsToLocalStorage();
        resolve(`Student ${name} was deleted successfully!`);
      } catch (err) {
        reject(err);
      }
    }, 1000)
  })
}