The Zodit dialog system allows you to create modals with title, footer, and content.
Each dialog is created as a separate inheritor component [[View]].

Several basic wrappers are available out of the box to quickly create basic windows: [[Alert]]/[[Confirm]]/[[Prompt]]

```js
Zodit.Alert('Hello world!', () => {
	// After OK
});
Zodit.Confirm('Are you sure?', 'Confirm Dialog', yes => {
	if (yes) {
		// do something
	}
});
Zodit.Prompt('Enter your name', 'Prompt Dialog', name => {
	if (name.length < 3) {
		Zodit.Alert('The name must be at least 3 letters');
		return false;
	}
	// do something
});
```

Each of these wrappers returns an [[IDialog]] object, and you can expand the open window.

```js
const dialog = Zodit.Alert('Hello world!', () => {
	// After OK
});
dialog.setContent('Buy buy world! =)');
```

> Note that you do not need to call the [[Dialog.open]] method.

For a simpler setup, you can immediately create an instance [[Dialog]] and already fully manage its contents:

```js
const dialog = new Zodit.modules.Dialog();
dialog.setHeader('The header!');
dialog.setContent('Content');
dialog.setFooter([
	new Zodit.modules.UIButton(dialog).onAction(() => {
		dialog.close();
	})
]);
dialog.open();
```
