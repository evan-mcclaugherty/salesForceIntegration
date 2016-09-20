exports.up = function(knex, Promise) {
    return knex.schema.createTable('student_books', function(table) {
        table.increments();
        table.integer('student_id').references('student.id').onDelete('cascade');
        table.integer('book_id').references('book.id').onDelete('cascade');
    })
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('student_books');
};
