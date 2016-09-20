var knex = require('./knex');
var conn = require('../sfApi/salesForce');

module.exports = {
    getStudentById: id => knex('student').where('id', id).first(),
    findBook: bookName => knex('book').where('title', bookName).first(),
    insertBook: function(body) {
        return knex('book').where('title', body.title).first().then(book => {
            if (book) {
                return knex('book').returning('id').insert({
                    title: body.title,
                    minutes: body.minutes,
                    day: body.day,
                    bookID: book.bookID
                }).then(id => {
                    return {
                        id: id[0],
                        bookID: book.bookID
                    }
                })
            } else {
                return conn.sobject("Books__c").create({
                    Name: body.title
                }).then(bookID => {
                    return knex('book').returning('id').insert({
                        title: body.title,
                        minutes: body.minutes,
                        day: body.day,
                        bookID: bookID.id
                    }).then(id => {
                        return {
                            id: id[0],
                            bookID: bookID
                        }
                    })
                })
            }
        })
    }
};
