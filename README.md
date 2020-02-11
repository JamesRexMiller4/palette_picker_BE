# palette_picker_BE
BackEnd Repo for Palette Picker


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
