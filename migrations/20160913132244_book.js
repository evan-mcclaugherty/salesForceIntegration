exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', function(table) {
        table.increments();
        table.string('title');
        table.integer('minutes');
        table.string('day');
        table.string('bookID');
    })
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('book');
};
