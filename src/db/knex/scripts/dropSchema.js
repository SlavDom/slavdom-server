export default function drop(knex, tables) {
    tables.forEach(a => knex.schema.dropTableIfExists(a))
}
