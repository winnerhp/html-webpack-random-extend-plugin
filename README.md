#### when to use

when use `html-webpack-plugin`,but can't insert random output prefix,you can use this plugin;

#### how to use

npm i html-webpack-random-extend-plugin

``` javascript
var HtmlWebpackRandomExtendPlugin = require('html-webpack-random-extend-plugin');

var list = ['//aaa.com','//bbb.com/'];

// or var list = '//aaa.com';

new HtmlWebpackRandomExtendPlugin({
    cdnPrefix: list
})

``` 
