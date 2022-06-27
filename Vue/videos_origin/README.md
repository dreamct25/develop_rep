# 影音網站
#### 主要是透過串接 youtube data v3 api 串流整合網站，收藏影片的部分則是透過 localstorage 儲存使用者所收藏的個支影片內容
### 部分資料匣內容
#### 使用到的主要模組：`vue cli`、`vue-router`、`boostrap`、`video-js`、`videojs-youtube`、`axios`、`sass-loader`、`node-sass` 等
#### src
> customPlugin (個人自行開發的 modal css、js)
> 
> components (所有元件與路由分頁)
>> 
>> Collect.vue (收藏影片)
>> 
>> Home.vue (主頁)
>> 
>> Modal.vue (互動視窗)
>> 
>> ModalAlert.vue (提示視窗)
>> 
>> Pagination.vue (頁籤)
>> 
>> Video.vue (單影音撥放)
>> 
>> VideoAll.vue (可撥放所有以收藏影音選單)
#### router
> index.js ( 分頁路由設定 )
