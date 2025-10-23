# 電商實作
### 部分資料匣內容
#### 使用到的主要模組：`vue cli`、`vue-router`、`boostrap`、`express`、`body-parser`、`cors`、`morgan`、`mssql`
#### server ( 存放 node js server 各項設定檔與各支 Sql 串接的路由的引用模組設定 )
> `serverConfig.js` ( node.js server 主要引用與模組設定邏輯，為主要檔案 )
>
> `SqlConnetSetting.js` ( 載入 `mssql 模組` 與連線至 `Docker` 物件設定 )
>
> `SqlAccount.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `Account 表單裡主要的 CRUD 邏輯` 與 `RESTful API`
>
> `SqlProduct.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `Product 表單裡主要的 CRUD 邏輯` 與 `RESTful API` )
>
> `SqlCoupon.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `Coupon 表單裡主要的 CRUD 邏輯` 與 `RESTful API` )
>
> `SqlOrderList.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `OrderList 表單裡主要的 CRUD 邏輯` 與 `RESTful API` )
>
> `SqlPayment.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `Payment 表單裡主要的 CRUD 邏輯` 與 `RESTful API` )
>
> `SqlCart.js` ( 引用模組 `SqlConnetSetting.js` 連接至資料庫的 `JOIN Product 與 OrderList 表單裡主要邏輯` 與 `RESTful API` )
#### src
> components (前台頁面分頁)
>> DashChild (後台頁面分頁)
#### router
> index.js ( 分頁路由設定 )
#### assets ( 主頁中有使用到的圖片與郵遞區號的 JSON 文件 )
