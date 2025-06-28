"use strict";

class Student {
  constructor(id, name, grades) {
    if (Number.isInteger(id)) {
      this.id = id;
    } else {
      throw Error(`Student ${id} is not a number`);
    }
    if (typeof name === "string") {
      this.name = name;
    } else {
      throw Error(`Name ${name} is not a string`);
    }
    if (grades === null) {
      this.grades = {};
    } else {
      this.grades = grades;
    }
  }

  addGrade(subject, grade) {
    if (grade === undefined) {
      throw Error(`Grade ${grade} is not a number`);
    }

    if (grade <= 1 || grade >= 6) {
      throw Error("Grade must be more than 1 and less than 6");
    }

    if (subject === null || subject === '' || !(typeof subject === 'string') ) {
      throw Error(`subject is not a string or empty string`);
    }

    for (const tmpSubject in grades) {
      if (tmpSubject === subject) {
        grades[tmpSubject] = grade;
      }
    }
    grades[subject] = grade;
  }

  getAverageGrade() {
    const values = Object.values(grades);
    let result = 0;
    for (let i = 0; i < values.length; i++) {
      result += values[i];
    }
    return result / Object.keys(grades).length;
  }

  get summary() {
    const grade = this.getAverageGrade();
    if (grade === undefined) {
      throw Error(`Grade ${grade} is not a number`);
    }
    return `Студент[${this.name}](id:[${this.id}] - средний балл:[${grade}]`;
  }
}

let grades = {
  "math": 3,
  "history": 4,
  "computer science": 5,
}

let student = new Student(1, "Danil", grades);

student.addGrade('dasdsa',3);
console.log(student);
