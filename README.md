# community

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

npm install sass-loader node-sass -D
webpack.base.config.js在loaders里面加上

{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
},


npm install vuex -S

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 目录结构

- src

  - components  组件放置在这里

  - base 通用组件

  - views 外层页面的布局结构放这里，页面
    - common    公共页面
          - Login       登录
          - Register    注册
              - 
          - Center      个人中心页面     - 多个次级页面
          - Draw        抽奖页面    
              - draw      抽奖记录
    

    - fiction   小说模块
          - index   小说模块首页，四个次级页面      - 原创，同人，完结，排行        
          - 多个相关页面


    - forum     论坛模块
          - index   论坛首页，四个次级页面          -交流社区，社区活动，掌动爆料站，新游推荐
          - 多个相关页面


    - shop      商城模块
          - Index           首页
          - List            商品列表页
          - Cart            购物车
          - Details         商品详情
          - OrderInfo       订单详情
          - OrderConfirm    订单确认
          - ......

  - router 路由配置
          - index  总路由配置
          - centerRoutes    个人中心及次级页面路由
          - fictionRoutes   小说模块路由
          - forumRoutes     论坛模块路由
          - shopRoutes      商城模块路由

  - store 
      - index
      - actions
      - getters
      - mutation-type
      - mutations
      - state

  - common  静态资源
      - css       
      - fonts     
      - images    
      - js        

  - api    axios 配置

- App           
- main       


### 移动端适配方案

使用淘宝rem适配方案 [lib-flexible] https://github.com/amfe/lib-flexible

[相关阅读] https://mp.weixin.qq.com/s?__biz=MzAwNjI5MTYyMw==&mid=2651493324&idx=1&sn=126efc9f0dd3a30169728a2f20527bab&chksm=80f19a04b7861312545429c4a77e18d8de3c0b07e2bc09b1ae54216806c37b33028c1f4ee803&mpshare=1&scene=1&srcid=1026OYYw6W1zURzKfTMC3i7e#rd 

[vw实现移动端适配] https://www.w3cplus.com/mobile/vw-layout-in-vue.html

使用px2rem-loader做rem转换，在页面中只需要写px单位，  px2rem配置问题，网上可查
font-size不使用rem， 使用px单位时，必须加上 "/*no*/" 才不会在编译时转换成rem单位

####    mock  api接口数据为本地虚拟服务器数据，本地使用wampServer + thinkphp 开发后台，直接接入数据库数据。当前只上传前端项目，无法演示