exports.up = function(knex, Promise) {
    return knex.schema.createTable('student', function(table) {
        table.increments();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('objectID').notNullable();
    })
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('student');
};
