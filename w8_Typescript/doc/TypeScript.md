# TypeScript教程

## 介绍
TypeScript由微软开发的自由和开源的编程语言，设计目标是开发大型应用，是js的扩展（支持现有js代码），通过编译成纯 JavaScript在不同的浏览器中运行

## 安装

```bash
    # 全局安装
    npm install -g typescript

    #安装后通过tsc命令执行
    tsc -v
```

## 使用

### 语言扩展

* 类型注解和编译时类型检查（不指定则以类型推论规则指定变量类型）
    > 格式：`var [变量名] : [类型] = 值;`
    * string
    * number
    * boolean
    * null
    * undefined
    * any
        > 任意类型：变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

    ```ts
        let username:string = 'laoxie';
        let age:number = 18;

        username = 123456;//在编译时报错
    ```
* 数组
```ts
    let arr:number[] = [10,20,30]
    let arr:Array<string> = ['laoxie','lemon','jingjing']
```
* 元组Tuple
> 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```ts
    let arr:[number,number,string] = [10,20,'h5']
```

* 函数
    > 在ts中调用函数时，输入多余的（或者少于要求的）参数，是不被允许的
    
    ```ts
        function getData(url:string,page:number):void{
            // ajax请求
        }
        getData('/list');//报错
        getData('/list',1,'get')
    ```
    
    * 可选参数
    ```ts
        function getData(url:string,page?:number):void{
             // ajax请求
        }
    ```
    * 默认参数
    ```ts
        function getData(url:string,page:number=1,type:string='get'):void{
             // ajax请求
        }
    ```

* 泛型编程
> 可以适用于多个类型，格式：`Array<元素类型>`

```ts
    function identity<T>(arg: T): T {
        return arg;
    }
    let output = identity<string>("myString");
```


* 接口
接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述（对象类型判断）
```ts
    interface Person {
        name: string;

        // 可选属性
        age?:number;

        // 只读属性（只能在创建的时候被赋值）
        readonly marry:boolean

        // 任意属性
        [propName: string]: any;

        // 方法定义
        // say();
    }

    function greeter(person: Person) {
        // 传入的参数persion类型必须符合Person接口的描述
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = { name: "laoxie",marry:true};

    greeter(user)
```

* 类
    * 定义`class`
        > 与ES6一致
    * 继承`extends`
        > 与ES6一致
    * 修饰符
        * public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
        * private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
        * protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
        * readonly  只读属性关键字，只允许属性声明（与其他修饰符一起使用时必须写在最后）
    * 类型检查
        > 与接口一致

```ts
    class Student {
        // 实例属性
        fullName: string;
        // 静态属性
        static age = 18;
        // public firstName
        // 在构造函数参数中使用修饰符，等效于以上写法
        constructor(public firstName,  public lastName) {
            this.fullName = firstName + " " + lastName;
        }
    }

    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person : Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = new Student("qianfeng","laoxie");

    greeter(user);
```

* 命名空间namespce（了解）
> namespce目的就是解决重名问题，可以利用同一个命名空间把代码分散到不同的文件
```ts
    namespace Validation {
        export interface StringValidator {
            isAcceptable(s: string): boolean;
        }
    }
    // 使用步骤：
    // 1. 引用文件（三个斜杠）
    /// <reference path="Validation.ts"/>
    // 2. 通过点语法调用
    Validation.StringValidator;
```
PS：命名空间最终会被生命为全局对象，所以在typescript中已经不推荐使用，建议使用Module来组织代码结构

* 模块
    * CommonJS（默认）
    * ES Module
* lambda 函数的箭头语法
> 与ES Module一致
* 可选参数以及默认参数
> 与ES Module一致


### 配置文件
* tsconfig.json
> 通过 `tsc --init` 生成
```json
{
    "compilerOptions": {
        // 与 Vue 的浏览器支持保持一致
        "target": "es5",
        // 这可以对 `this` 上的数据属性进行更严格的推断
        "strict": true,
        // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
        "module": "es2015",
        "moduleResolution": "node"
    }
}
```

* webpack加载器:ts-loader
```js
    {
        //...
        module: {
            rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
            ]
        }
    }
```

### tsc命令

* 格式：`tsc <...文件> <参数>`
* 参数：
    * --help 显示帮助信息
    * --module 载入扩展模块
    * --target 设置 ECMA 版本
    * --declaration 额外生成一个 .d.ts 扩展名的文件。
    ```bash
        # 以下命令会生成 ts-hw.d.ts、ts-hw.js 两个文件
        tsc ts-hw.ts --declaration
    ```
    * --removeComments 删除文件的注释
    * --out 编译多个文件并合并到一个输出的文件
    * --sourcemap 生成一个 sourcemap (.map) 文件。
        >sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。
    * --module noImplicitAny 在表达式和声明上有隐含的 any 类型时报错
    * --watch 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。

