# palette_picker_BE
BackEnd Repo for Palette Picker

# SET UP 

1. Clone down the repo and run npm install 
2. If you do not already have postgres installed on your local machine, you will need to download that to your local machine.
3. Once Postgres has been installed you should also download Postico, a tool that makes it easier to view and manage the databases you have running on your machine locally.
4. In order to get the database set up properly and seeded with the test data, you will need to run the following commands: 
```
   pg
   CREATE DATABASE <nameofDB> ;
   \q
```

NOTE: you will want to review the knexfile.js and see how the pathing is setup and change the name of the database to the name of your newly created DB 

5. You may also want to create the test database at this time as well, run the same command as above and denote the name of the database as test 
6. From your repo folder in your terminal run the following commands: 
```
  knex migrate:latest
  knex seed:run 
```
7. If you have your test database set up, you will want to run the same commands but append to the end of each 
```
--env=test
```
NOTE: Just like with the development environment, you will want to review the knexfile and make sure that the pathing to your database is correctly named after your test database. 

8. You can confirm that your tables have been created and seeded by opening Postico and opening up the database created on your local machine

## Front End
This API was built in conjunction with our Front End application, PalettePicker.
* [PalettePicker - Deployed App](https://dashboard.heroku.com/apps/palettepicker2020)
* [PalettePicker FE repository](https://github.com/sertmer/Palette-Picker-FE)

# API ENDPOINTS - DOCUMENTATION

| API Paths             | Request       | Response                   |
| --------------------  |:-------------:| ------------------------------------------------:|
| 'api/v1/folders'| **GET**       |  **An Array of Folder Objects**  EX: ```[ { id: 577, folder_name: 'Project #1'},{...}, {...} ]```|        |
| 'api/v1/folders/:folderId'| **GET**   |   **A single folder (object)** *Ex:* ```{"id": 1,"folder_name": "Join the Fold"}```|
| 'api/v1/folders/:folderId/palettes| **GET** | **An Array of palletes for single folder** *EX:* ```[ { id: 4771, palette_name: 'Palette #1', color_one: '#80adaa', color_two: '#d9c9fb', color_three: '#9c5f3d', color_four: '#4ba9b3', color_five: '#a6617c', folder_id: 1591 }, { ... }, { ... } ] ``` |
| 'api/v1/folders/:folderId/palettes/:paletteId'| **GET**| **A single palette (object)** Ex: ```{"id": 1, "palette_name": "Palette #1", "color_one": "#80adaa", "color_two": "#d9c9fb", "color_three": "#9c5f3d", "color_four": "#4ba9b3", "color_five": "#a6617c", "folder_id": 1}```|
| 'api/v1/folders'| **POST**  *Must include folder_name(string) in body of request object Ex:* ```{folder_name:'Palettes to Save the World'}```|id of posted folder: ```{id: <integer}```|
| 'api/v1/folders/:folderId/palettes'          | **POST** *Must include paletteName(string) and colors(Array of strings) in body of request object Ex:* ```{paletteName: 'Big Ole Palette', colors: ["#80adaa", "#d9c9fb", "#9c5f3d", "#4ba9b3", "#a6617c"]}```| **An object with newly created palette, folderId, and its paletteId Ex:**```{paletteName: 'Big Ole Palette', colors: ["#80adaa", "#d9c9fb", "#9c5f3d", "#4ba9b3", "#a6617c"], folder_id: '4', id: 1}```|
| 'api/v1/folders/:folderId| **PATCH** *Must include { folderName: <String> }  in request body* | **An object with the updated name Ex:** ```{folderName: 'Wubbalubbadubdub'}```|
| 'api/v1/folders/:folderId/palettes/:paletteId'| **PATCH** *Must include* ```{ palette_name: 'colors that depress my parents', color_one: '#9c5f3d', color_two: '#9c5f3d', color_three: '#9c5f3d', color_four: '#9c5f3d', color_five: 'pur#9c5f3dple', folder_id: 1 }``` | **The updated palette object EX:** ```{ palette_name: 'colors that depress my parents', color_one: '#9c5f3d', color_two: '#9c5f3d', color_three: '#9c5f3d', color_four: '#9c5f3d', color_five: 'pur#9c5f3dple', folder_id: 1 }```|
| 'api/v1/folders/:folderId      | **DELETE**      | **A text response** Ex: ```'Folder has been deleted'``` |
| 'api/v1/folders/:folderId/palettes/:paletteId' | **DELETE** | **A text response** Ex: ```'Palette has been deleted'``` |

# QUERYING DATABASE WITH CUSTOM ENDPOINTS
| API Paths             | Params       | Response                   |
| --------------------  |:-------------:| ------------------------------------------------:|
| '/api/v1/palettes?'| *Can query for palette name from palettes table. Ex:'/api/v1/palettes?palette_name='WubbaLubbaDubDub' | **SUCCESS-an object** Ex: ```{palette_name: 'WubbaLubbaDubDub', colors: ['#FFFFFF', '#FFFFFF', ...], folder_id: "42", id: 4} has been deleted'``` **FAILURE-text response** Ex:'No results match that query'  |
