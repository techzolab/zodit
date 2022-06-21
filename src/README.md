The Zodit editor consists of modules and plugins. Modules make up the permanent basis of the editor's work,
and plugins can add their own functionality [[plugin]].

The editor is initialized on a DOM element. It must already exist on the page:

```js
Zodit.make('#editor');
```

You can also set a DOM element right away.

```js
const elm = document.querySelector('#editor');
Zodit.make(elm);
```

The [[Zodit.make]] method returns an instance of [[Zodit]].

```js
const zodit = Zodit.make('#editor');
console.log(zodit.isReady);
```

This is almost equivalent to

```js
const zodit = Zodit.make('#editor');
console.log(zodit.isReady);
```

> But the `make` method is preferable.

All customization of the editor is done through the [[Config]]:

```js
Zodit.make('#editor', {
	height: 300
});
```

Zodit instance has a module [[EventEmitter]]

```js
const zodit = Zodit.make('#editor');
zodit.events.on('keydown', e => {
	console.log(e.key);
});
```

And the [[Select]] module, which allows you to manipulate the content of the editor through HTML insertion

```js
const zodit = Zodit.make('#editor');
zodit.s.focus();
zodit.s.insertHTML('<p>test</p>');
```
