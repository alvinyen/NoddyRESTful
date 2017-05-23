# NoddyRESTful

## 專案說明
以Express搭配Mongoose完成的RESTful API，應用Mocha、Chai、Gulp等工具來完成測試及構建，使用 Nginx搭配pm2部署於Digital Ocean。

## API SPEC
- host：http://noddyrestful.alvinyen.me
- /services/v1/things
    - 獲取所有的things
    - Request Method: GET
    - Error Handling：
        - { success: boolean, msg: 'error msg' }
        - 例如
            - { success: false, msg: 'system error' }
    - Response:
        - Content-Type：application/json
        - Body
            ```
            [
                {
                    name: "$nameOfThing", 
                    location: "$countryOfOrigin"
                },
                ...
            ]
            ```
- /services/v1/things/:id
    - 根據id獲取thing
    - Request Method: GET
    - Request Parameters:
        - id: thing id (document id)
    - Error Handling：
        - { success: boolean, msg: 'error msg' }
        - 例如：
            { success: false, msg: 'item not found' }
    - Response:
        - Content-Type：application/json
        - Body
            ```
            {
                id: "$documentId",
                name: "$nameOfThing",
                location: "$countryOfOrigin"
            }
            ```
- /services/v1/things
    - 傳遞name及location以新增thing到資料庫
    - Request Method: POST
    - Content-Type：application/json
    - Request Data in Body:
        - name：name of thing
        - location：country of origin
    - Error Handling：
        - { success: boolean, msg: 'error msg' }
        - 例如：
            { success: false, msg: 'insert failed' }
    - Response:
        - Content-Type：application/json
        - Body
            ```
            {
                _id: "$documentId",
                name: "$nameOfThing",
                location: "$countryOfOrigin",
                time: "$timestamp"
            }
            ```
- /services/v1/things/:id
    - 根據id更新資料庫中thing的name或location或both
    - Request Method: PUT
    - Content-Type：application/json
    - Request Data in Body:
        - name：name of thing
        - location：country of origin
    - Error Handling：
        - { success: boolean, msg: 'error msg' }
        - 例如：
            { success: false, msg: 'update failed because of invalid object id' }
    - Response:
        - Content-Type：application/json
        - Body
            ```
            {
                success: true,
                msg: "success to update"
            }
            ```
- /services/v1/things/:id
    - 根據id刪除資料庫中的thing
    - Request Method: DELETE
    - Error Handling：
        - { success: boolean, msg: 'error msg' }
        - 例如：
            { success: false, msg: 'failed to delete during db remove operation' }
    - Response:
        - Content-Type：application/json
        - Body
            ```
            {
                success: true,
                msg: "success to delete"
            }
            ```