# palette_picker_BE
BackEnd Repo for Palette Picker


# API ENDPOINTS - DOCUMENTATION

| Api Paths             | Request       | Response                                         |
| --------------------  |:-------------:| ------------------------------------------------:|
| '/api/v1/users/:id'   | **GET**           |   **pending**                                |
| 'api/v1/users/:id/folders'| **GET**       |  **pending**                                 |
| 'api/v1/users/:id/folders/:folderId'| **GET**   |   **A single folder (object) ** Ex:```{"id": 1,"folder_name": "Join the Fold", "user_id": 1}```|
| 'api/v1/users/:id/folders/:folderId/palettes| **GET** | **pending**                      |
| 'api/v1/tweets/:id/folders/:folderId/palettes/:paletteId'| **GET**| **An single palette** Ex: ```{"id": 2,"color_one": "", "color_two": "", "color_three: "", color_four: "", color_five: "", "folder_id": 2}```|
| 'api/v1/users'          | **POST** *Must include username(string) and password(string) in body of request object Ex:* ```{username: 'Jarvis Blargus', password: 'password123'}```| **pending**|
| 'api/v1/users/:id/folders'| **POST**  *Must include folder_name(string) and user_id(string) in body of request object Ex:* ```{folder_name:'Folder with Important Palettes', user_id:'42'}```| **pending**|
| 'api/v1/users/:id/folders/:folderId| **PUT/PATCH** | **pending** |
| 'api/v1/users/:id/folders/:folderId/palettes/:paletteId'| **PUT/PATCH** | **pending** |
| 'api/v1/users/:id       | **DELETE**      | **A text response** Ex: 'Account has been deleted'|
| 'api/v1/users/:id/folders/:folderId      | **DELETE**      | **A text response** Ex: 'Folder has been deleted' |
| 'api/v1/users/:id/folders/:folderId/palettes/:paletteId' | **DELETE** | **A text response** Ex: 'Palette has been deleted' |
