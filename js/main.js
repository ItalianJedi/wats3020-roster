/* JS for WATS 3020 Roster Project */


// Created a base class called `Person` that takes the parameters `name`
// and `email` and makes those available as attributes. The `constructor()`
// method broke the username from before the `@` symbol in the
// `email` value and use that to store on a `this.username` property.

class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        //The split threw me off since I associate that with Arrays
        this.username = email.split('@')[0];
    }
}



// Created another class that extends the `Person` class called `Student`.
// The `Student` class added a line to the `constructor()` method that set
// the property `this.attendance` to an empty Array (`[ ]`). The `attendance`
// property will be used to record and track attendance. 
//

class Student extends Person {
    constructor(name, email){
        super(name, email);
        this.attendance = [];
    }
    
    
   // Created another method on the `Student` class called `calculateAttendance`.
    // This method gives a percentage of how many days the student was present.
    // It should return a string like "90%" or "84.732%". Attendance should be
    // recorded into an Array using either a `0` for "absent" or a `1` for "present".
    // This should allow attendance percentage to be calculated as the average of
    // all the items in the `attendance` Array. 

    calculateAttendance(){
        //this.attendance.length of the array 
        if (this.attendance.length > 0) {
            let counter = 0;
            for (let mark of this.attendance){
                counter = counter + mark;
            }
            let attendancePercentage = counter / this.attendance.length * 100;
        return `${attendancePercentage}%`;
    } else {
        return "0%";
    }
  }
}




// Created another class that extends the `Person` class called `Teacher`.
// The `Teacher` class adds a property called `this.honorific` (supplied
// when an instance of `Teacher` is created).

class Teacher extends Person {
    constructor(name, email, honorific){
        super(name, email);
        this.honorific = honorific;
    }
}

// Set up the Course class so we can run the whole roster from it.
class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

    /////////////////////////////////////////
    // The `addStudent()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Created a method called `addStudent()` that prompts the user for
    // information required to create a new `Student` object (`name`, `email`)
    // and does so, then adds the student to the `this.students` Array. Also it 
    // updates the roster display by calling `updateRoster()`. 
    
    addStudent(){
        let name = prompt('What is the Student\'s name?:');
        let email = prompt('What is the Student\'s email address?:');
        let newStudent = new Student(name, email);
        this.students.push(newStudent);
        updateRoster(this);
    }
    
    // Test removeStudent. Tried and failed to figure it out.
    //removeStudent(){
    //    let name = prompt('Which student is being removed?:');
    //    this.students.split('name');
    //    updateRoster(this);
   // }


    /////////////////////////////////////////
    // The `setTeacher()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Created a method called `setTeacher()` that prompts the user for the
    // information required to create a `Teacher` object (`name`, `email`) and
    // does so, then sets the `this.teacher` property equal to the new `Teacher` object.
    
  setTeacher(){
      let name = prompt('Teacher Full Name:');
      let email = prompt('Teacher Email:');
      let honorific = prompt('Honorific (e.g. Dr., Prof., Mr., Ms.):');
      this.teacher = new Teacher(name, email, honorific);
      updateRoster(this);
  }  


    /////////////////////////////////////////
    // The `markAttendance()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Created a method to mark a student's attendance called `markAttendance()`.
    // This method will accept a parameter called `username` containing the
    // `username` that will match the `username` property on the `Student` object.

    // The FIRST step to create a functioning `markAttendance()` method is
    // to retreive the `Student` object out of the `this.students` Array.
    // The `this.findStudent()` method (provided below) accomplishes
    // that goal. 

    // Now that we have retrieved the specific `Student` object we want
    // to work with, we can use the appropriate method on the `Student` object
    // to record the attendance.
    
    markAttendance(username, status='present'){
        let student = this.findStudent(username);
        if (status === 'present'){
            student.attendance.push(1);
        } else {
            student.attendance.push(0);
        }
        updateRoster(this);
    }



    //////////////////////////////////////////////
    // Methods provided for you -- DO NOT EDIT /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    findStudent(username){
        // This method provided for convenience. It takes in a username and looks
        // for that username on student objects contained in the `this.students`
        // Array.
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
    }
}

/////////////////////////////////////////
// Prompt User for Course Info  //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Prompt the user for information to create the Course. In order to create a
// `Course` object, you must gather the following information:
//

let courseCode = prompt(`Enter course code (e.g. WATS 3020):`);


let courseTitle = prompt(`Course Title:`);


let courseDescription = prompt(`Course Description:`);


let myCourse = new Course(courseCode, courseTitle, courseDescription);

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the page. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

if (myCourse.teacher){
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = `${myCourse.teacher.honorific} ${myCourse.teacher.name}`;
} else {
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = "Not Set";
}

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
rosterTbody.innerHTML = '';

// Create event listener for adding a student.
let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

// Create event listener for removing a student.
//let removeStudentButton = document.querySelector('#remove-student');
//removeStudentButton.addEventListener('click', function(e){
//    console.log('Calling removeStudent() method.');
//    myCourse.removeStudent();
//})

// Create event listener for adding a teacher.
let addTeacherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})

// Call Update Roster to initialize the content of the page.
updateRoster(myCourse);

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    rosterTbody.innerHTML = '';
    if (course.teacher){
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = `${course.teacher.honorific} ${course.teacher.name}`;
    } else {
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = "Not Set";
    }
    // Populate Roster Content
    for (student of course.students){
        // Create a new row for the table.
        let newTR = document.createElement('tr');

        // Create table cells for each data point and append them to the new row.
        let nameTD = document.createElement('td');
        nameTD.innerHTML = student.name;
        newTR.appendChild(nameTD);

        let emailTD = document.createElement('td');
        emailTD.innerHTML = student.email;
        newTR.appendChild(emailTD);

        let attendanceTD = document.createElement('td');
        attendanceTD.innerHTML = student.calculateAttendance();
        newTR.appendChild(attendanceTD);

        let actionsTD = document.createElement('td');
        let presentButton = document.createElement('button');
        presentButton.innerHTML = "Present";
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        actionsTD.appendChild(presentButton);

        let absentButton = document.createElement('button');
        absentButton.innerHTML = "Absent";
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');
        actionsTD.appendChild(absentButton);

        newTR.appendChild(actionsTD);

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Call function to set event listeners on attendance buttons.
    setupAttendanceButtons();
}

function setupAttendanceButtons(){
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} present.`);
            myCourse.markAttendance(e.target.dataset.username);
            updateRoster(myCourse);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} absent.`);
            myCourse.markAttendance(e.target.dataset.username, 'absent');
            updateRoster(myCourse);
        });
    }
}

