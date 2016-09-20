var knex = require('./knex');
var conn = require('../sfApi/salesForce');

module.exports = {
    getStudentById: id => knex('student').where('id', id).first(),
    findStudentId: username => select('id').from('student').where('username', username).first(),
    findStudent: username => knex('student').where('username', username).first(),
    addStudent: body => {
        return conn.sobject("Student__c").create({
            Name: body.username
        }).then(returned => {
            return knex('student').insert({
                username: body.username,
                password: body.password,
                objectID: returned.id
            }).returning('id').then(id => {
                return knex('student').where('id', id[0]).first();
            }).then(studentID => {
                return studentID
            })
        });
    },
    queryStudents: username => knex.select('*').from('student').where('username', username).join('student_books', 'student.id', 'student_id').join('book', 'book_id', 'book.id')
};
