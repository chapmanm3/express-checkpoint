const express = require('express');
const app = express();

const PORT = 8080

app.use(express.json());

let students = [
    {
        name: "Matt Chapman",
        id: 1,
        grades: [100, 100, 100]
    },
]

app.get('/students?', (req, res) => { //Work on search param
    if(req.query){
        let matchingStudents = [];
        students.forEach((student) => {
            (student.name.includes(req.query.name)) ?
                matchingStudents += student : null 
        })
        matchingStudents.length > 0 ? 
            res.status(200).json({'success': true, 'Matching Students': matchingStudents}) :
            res.status(200).json({'success': true, 'Message': 'No Matching Students'})
    } else {
        res.status(200).json({'succeess': true, 'Students': students})
    }
});

app.get('/students/:studentId', (req, res) => {
    let studentFound = false;
    students.forEach((student) => {
        if(student.id == req.params.studentId){
            studentFound = true;
            res.status(200).json({'success': true, 'Student': student})
        }
    })
    if(!studentFound){
        res.status(200).json({'success': false, 'Message': 'Student not found'})
    }
})

app.get('/grades/:studentId', (req, res) =>{
    let studentFound = false;
    students.forEach((student) => {
        if(student.id == req.params.studentId){
            studentFound = true;
            res.status(200).json({'success': true, 'Grades': student.grades})
        }
    })
    if(!studentFound){
        res.status(200).json({'success': false, 'Message': 'Student not found'})
    }
})

app.post('/grades', (req, res)=>{
    let studentId = req.body.studentId;
    let grade = req.body.grade;
    console.log(req.body);
    console.log(studentId + ' ' + grade);
    if (!(studentId && grade)){
        res.status(200).json({'success': false, 'Message': 'No student or grade supplied'})
    }
    students.forEach((student) => {
        if(student.id == studentId){
            student.grades.push(grade);
            res.status(200).json({'success': true, 'Message': 'Grade added'})
        }
    })
    res.status(200).json({'success': false, 'Message': 'Student not found'})
})

app.post('/register', (req,res) =>{
    let username = req.body.username;
    let email = req.body.email;
    (username && email) ?
        res.status(200).json({'success': true, 'Message': 'User registered I guess idk? this endpoint isnt to register students so I guess its to register teachers idk man?'}) :
        res.status(200).json({'success': false, 'Message': 'No username or email supplied'});

})

app.listen(PORT);

module.exports = app;