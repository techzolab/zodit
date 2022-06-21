A module for working with the cursor, text selections, processing selections, inserting html in place of the cursor.
most obvious use case

## How to insert HTML into Zodit

There is a family of methods for this.[[Select.prototype.insertHTML]], [[Select.prototype.insertNode]], [[Select.prototype.insertImage]].

```js
const zodit = Zodit.make('#editor');
zodit.selection.insertHTML('<span>some html</span>');
zodit.selection.insertNode(document.createElement('div')); // don't do that =) see [[core/create]]
zodit.selection.insertImage('https://somesite.com/image.png');
```

## How to set focus in Zodit editor

```js
const zodit = Zodit.make('#editor');
zodit.selection.focus();
```
