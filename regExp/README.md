
## introduction

* `\b`单词边界符

```js 
/\brow\b/.exec("grow up, stand in row")`
```

匹配任意字符（包括换行）
`\s\S`
```js
//匹配优先：在不确定是否匹配时，优先认为是匹配的，直到需要回溯（字串结束，正则式未结束），依次倒推。
/<a\s[\s\S]+<\/a>/.exec(`<a href='#'>link</a>
<a>test</a>`);

// 匹配忽略优先：优先认为是非匹配，然后去匹配后面的正则式。
/<a\s[\s\S]+?<\/a>/.exec(`<a href='#'>link</a>
<a>test</a>`);

//也可用于{m,n}?类似形式
```

* 环视

>设置后续条件匹配当前字串。

```js
// 肯定环视(?=xxx)
/hello\s(?=jane)/.exec("hello jane!"); // 注意匹配到'hello '
// ["hello ", index: 0, input: "hello jane!"]

// 否定环视(?!)
/hello(?!\s)/.exec("hello!"); // 匹配到'hello'
// ["hello", index: 0, input: "hello!"]
```

## group

* basic

```js
/(\d{4})-(\d{2})-(\d{2})/.exec("2017-09-27")
// ["2017-09-27", "2017", "09", "27", index: 0, input: "2017-09-27"]

// 非捕获分组
/(?:\d{4})-(\d{2})-(\d{2})/.exec("2017-09-27")
// ["2017-09-27", "09", "27", index: 0, input: "2017-09-27"]

// 需要注意的是，如果可以多次匹配，分组内保留的是最后一次匹配上的字串
/(\w+\.?)+/.exec("aaa.bb.cc") // key point is the outer '+'
// ["aaa.bb.cc", "cc", index: 0, input: "aaa.bb.cc"]
```
>嵌套括号，输出顺序按括号出现顺序从左到右

* 反向引用

```js
/([a-z])\1/.exec("scoop");
```