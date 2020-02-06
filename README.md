# palette_picker_BE
BackEnd Repo for Palette Picker


# API ENDPOINTS - DOCUMENTATION

| API Paths             | Request       | Response                   |
| --------------------  |:-------------:| ------------------------------------------------:|
| 'api/v1/folders'| **GET**       |  **An Array of Folder Objects**  EX: ```[ { id: 577, folder_name: 'Project #1', user_id: 193 },{...}, {...} ]```|        |
| 'api/v1/folders/:folderId'| **GET**   |   **A single folder (object)** *Ex:* ```{"id": 1,"folder_name": "Join the Fold", "user_id": 1}```|
| 'api/v1/folders/:folderId/palettes| **GET** | **An Array of palletes for single folder** *EX:* ```[ { id: 4771, palette_name: 'Palette #1', color_one: '#80adaa', color_two: '#d9c9fb', color_three: '#9c5f3d', color_four: '#4ba9b3', color_five: '#a6617c', folder_id: 1591 }, { ... }, { ... } ] ``` |
| 'api/v1/folders/:folderId/palettes/:paletteId'| **GET**| **A single palette (object)** Ex: ```{"id": 1, "palette_name": "Palette #1", "color_one": "#80adaa", "color_two": "#d9c9fb", "color_three": "#9c5f3d", "color_four": "#4ba9b3", "color_five": "#a6617c", "folder_id": 1}```|
| 'api/v1/folders'| **POST**  *Must include folder_name(string) in body of request object Ex:* ```{folder_name:'Palettes to Save the World'}```|id of posted folder: ```{id: <integer}```|
| 'api/v1/folders/:folderId| **PUT/PATCH** | **pending** |
| 'api/v1/folders/:folderId/palettes/:paletteId'| **PUT/PATCH** | **pending** |
| 'api/v1/folders/:folderId      | **DELETE**      | **A text response** Ex: ```'Folder has been deleted'``` |
| 'api/v1/folders/:folderId/palettes/:paletteId' | **DELETE** | **A text response** Ex: ```'Palette has been deleted'``` |
