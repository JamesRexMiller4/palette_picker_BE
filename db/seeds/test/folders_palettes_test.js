const data = require('../../../data');

const createFolders = async (knex, folder) => {
 const folderId = await knex('folders').insert({
   folder_name: folder.folderName
 }, 'id')
 
 let palettePromises = await folder.palettes.map(palette => {
   return createPalettes(knex, palette, folderId)
 })
 return Promise.all(palettePromises)
}
 
const createPalettes = async (knex, palette, id) => {
 return knex('palettes').insert({
   palette_name: palette.paletteName,
   color_one: palette.colors[0],
   color_two: palette.colors[1],
   color_three: palette.colors[2],
   color_four: palette.colors[3],
   color_five: palette.colors[4],
   folder_id: id[0]
 })
}
 
exports.seed = async knex => {
 try {
   await knex('palettes').del();
   await knex('folders').del();
 
   let folderPromises = data.map(folder => {
     return createFolders(knex, folder)
   })
   return Promise.all(folderPromises);
 } catch(error) {
   console.error(`Error seeding data: ${error}`)
 }
};
 

