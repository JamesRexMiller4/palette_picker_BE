const data = require('../../testData');

const createUsers = async (knex, user) => {
  const userId = await knex('users').insert({
    username: user.username,
    password: user.password
  }, 'id')

  let folderPromises = await user.folders.map(folder => {
    return createFolders(knex, folder, userId)
  })
  return Promise.all(folderPromises)
}

const createFolders = async (knex, folder, userId) => {
  const folderId = await knex('folders').insert({
    folder_name: folder.folderName,
    user_id: userId[0]
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
    await knex('users').del();

    let userPromises = data.map(user => {
      return createUsers(knex, user)
    })
    return Promise.all(userPromises);
  } catch(error) {
    console.error(`Error seeding data: ${error}`)
  }
};