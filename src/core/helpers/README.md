Assistant functions are intended for small basic operations and are divided into subgroups.

For example, the [[helpers/string]] subgroup is designed to work with strings:

```js
Zodit.modules.Helpers.ucfirst('hello'); // Hello
Zodit.modules.Helpers.camelCase('hello-world'); // helloWorld
Zodit.modules.Helpers.trim('       hello-world  '); // hello-world
Zodit.modules.Helpers.kebabCase('helloWorld'); // hello-world
```

And the [[helpers/html]] subgroup is designed to work with strings containing HTML:

```js
Zodit.modules.Helpers.nl2br('hello\nworld'); // hello<br>world
```

> All helpers, regardless of the group, are in the namespace `Zodit.modules.Helpers`

The most commonly used helpers are checkers [[helpers/checker]]:

```js
Zodit.modules.Helpers.isBoolean('hello'); // false

Zodit.modules.Helpers.isHtml('hello-world'); // false
Zodit.modules.Helpers.isHtml('<p>hello world</p>'); // true

Zodit.modules.Helpers.isInt('100'); // true
Zodit.modules.Helpers.isInt('100.1'); // false
Zodit.modules.Helpers.isInt('test'); // false

Zodit.modules.Helpers.isFunction(() => {}); // true
Zodit.modules.Helpers.isString(123); // false
```
