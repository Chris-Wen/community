# community

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

npm install node-sass --save-dev
npm install sass-loader --save-dev
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
