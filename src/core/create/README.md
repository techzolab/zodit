Every internal DOM node of both the editor interface and the editor content itself must be created through this module.
This is due to the fact that the interface can be shown in an iframe, or another window.
And in this case, you need to create its elements using the document from this window.
In order not to worry about it yourself, this module was created.

For example, we initialize the editor in iframe mode:

```js
const zodit = Zodit.make('#editor', { iframe: true });
```

In this case, in plugins, to insert a value, you would have to write the following construction:

```js
const p = zodit.iframe.contentWindow.document.createElement('p');
zodit.s.insertNode(p);
```

In order not to think about it, the [[IZodit]] interface has a field [[Zodit.createInside]] and [[Zodit.create]].
Both fields are [[ICreate]] instances, but the first should be used for creating elements inside the editor.
And the second is for the editor interface.

The previous example, regardless of the operating mode, will be like this:

```js
const p = zodit.createInside.element('p');
zodit.s.insertNode(p);
```

This method of creating DOM elements has one more advantage, you can add the option [[Config.createAttributes]]
And then, for each created element, the attributes you specified will already be set:

```js
const zodit = Zodit.make('#editor', {
	createAttributes: {
		p: {
			style: 'color: red'
		},
		a: a => {
			a.title = 'Some title';
		}
	}
});

const p = zodit.createInside.element('p');
console.log(p.style.cssText); // color: red

const a = zodit.createInside.element('a');
console.log(a.title); // Some title
```

To create DOM elements from text, you should also use this module:

```js
const p = zodit.createInside.fromHTML('<p>text</p>');
zodit.s.insertNode(p);
```
