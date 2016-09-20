var knex = require('./knex');
var conn = require('../sfApi/salesForce');

module.exports = {
    getStudentById: id => knex('student').where('id', id).first(),
    findStudent: username => knex('student').where('username', username).first(),
    insertStudentBooks: (bookId, studentId) => {
        return knex('student_books').insert({
            student_id: studentId,
            book_id: bookId
        })
    },
    insertSalesForceStudentBooks: info => {
        return conn.sobject("Student_Books__c").create({
            Student__c: info.studentName,
            Books__c: info.bookName,
            minutes__c: info.minutes,
            day__c: info.day
        })
    }
};
