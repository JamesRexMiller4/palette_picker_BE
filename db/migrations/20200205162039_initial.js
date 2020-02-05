 
exports.up = knex => {
  return knex.schema
    .createTable('folders', table => {
      table.increments('id').primary();
      table.string('folder_name');
    })
    .createTable('palettes', table => {
      table.increments('id').primary();
      table.string('palette_name');
      table.string('color_one');
      table.string('color_two');
      table.string('color_three');
      table.string('color_four');
      table.string('color_five');
      table.integer('folder_id')
        .references('folders.id')
    })
 }
  
 exports.down = knex => {
  return knex.schema
    .dropTable('palettes')
    .dropTable('folders')
 };
  
 
 