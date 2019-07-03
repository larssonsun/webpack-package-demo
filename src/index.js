// 添加依赖
const fuk = module.require("./assets/css/base.css")
const you = module.require("./assets/css/addon-index.css")
const fonthost = module.require("./assets/fonts/mobiriseicons.css")
// const fkbutton = module.require("./components/custom/button/shit-button.js")

/* 
1.这里要注意，因为用es6的语法引入模块则会进入严格模式。因为ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
    ({ a: x, b: y } = { a: "ctm", b: "的" });打包后会报x没有定义。
    而使用node.js的commonjs语法module.require怎没有这个问题，以为他默认是不打开严格模式的

2. import 后面的大括号不能省略。类似一种解构赋值。但如果源文件中export 是default的话。则可以
*/
import { fkbutton } from "com-btn/shit-button" // com-btn指向 src/components/custom/button 目录

// 为了测试babel-loader我们用es6语法来重写sht方法
/* webpack打包后，在文件定义的变量属于内部变量。也就是说webpack把各个文件封装。。使得你无法访问
 所以要在打包后，还能全局调用则必须定义为全局变量（这里是方法引用）
*/
window.sht = () => {// 箭头函数
    var { a: x, b: y } = { a: "ctm", b: "的" };// 解构无声明赋值（及变量重命名，严格模式）
    alert(x + y);
};

window.onload = () => {
    fkbutton(document.body, "NODE_ENV in app.js: " + process.env.NODE_ENV);
};