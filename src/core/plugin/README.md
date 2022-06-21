Zodit plugins are designed to extend the basic functionality of the editor.
There are built-in plugins, without which the editor will not work correctly. There are plugins that add completely new functionality.
You can write your own plugin that will either change the current behavior of the editor or add a new function.

Plugins can be both simple functions and complex classes.

In the simplest case, it's just a function that receives a Zodit instance as input.

```js
Zodit.plugins.add('alertMyId', function (zodit) {
	alert(zodit.id);
});
```

The moment you create an instance of Zodit, all plugins are initialized.

```js
const editor = Zodit.make('#editorId'); // alert('editorId')
```

This is usually not what you expect. You probably want the plugin to take action on certain events.
The [EventEmiter](https://github.com/techzolab/zodit/blob/master/src/types/events.d.ts#L9) editor will help you with this.

```js
Zodit.plugins.add('keyLogger', function (zodit) {
	zodit.events.on('keydown', e => {
		sendAnalytics('keydown', e.key);
	});
});
```

As mentioned above, plugins can be more complex than just a function. A plugin can be a class:

```js
class resizeEditor {
	hasStyle = true;

	buttons = [
		{
			name: 'custom',
			group: 'other'
		}
	];

	requires = ['enter', 'drag-and-drop'];

	init(zodit: IZodit): void {
		zodit.events.on('afterInit', () => {
			Zodit.ns.Helpers.css(zodit.editor, {
				width: 400
			});
		});
	}

	destruct() {
		Zodit.ns.Helpers.css(this.zodit.editor, {
			width: null
		});
	}
}

Zodit.plugins.add('resizeEditor', resizeEditor);
```

### hasStyle

-   Type: boolean
-   Default: false

Zodit will try to load the styles along the same path as the plugin is loaded.

### buttons

-   Type: Array<IPluginButton>
-   Default: `[]`

```typescript
export interface IPluginButton {
	name: string;
	group?: ButtonGroup;
	position?: number;
	options?: IControlType;
}

export type ButtonGroup =
	| string
	| 'source'
	| 'font-style'
	| 'script'
	| 'list'
	| 'indent'
	| 'font'
	| 'color'
	| 'media'
	| 'state'
	| 'clipboard'
	| 'insert'
	| 'history'
	| 'search'
	| 'other'
	| 'info';
```

Buttons to be automatically added to the editor's button groups.
Those. if the plugin is connected, the button will appear in the list, if not connected, it will disappear.

```js
Zodit.defaultOptions.controls.insertTime = {
	icon: require('./icon.svg'),
	tooltip: 'Insert Time',
	exec: (editor: IZodit) => {
		editor.s.insertHTML(new Date().toTimeString());
	}
};

class insertTimePlugin {
	buttons = [
		{
			name: 'insertTime',
			group: 'insert'
		}
	];
}

Zodit.plugins.add('insertTimePlugin', insertTimePlugin);
```

### requires

-   Type: Array<string>
-   Default: []

If your plugin depends on other plugins, then it must be initialized after them.

## Debug

Since version `3.12.4` you can disable all Zodit plugins during development and work only with your own plugin.
This will allow you to find out if it works correctly and if it breaks the behavior of the editor or if it is caused by other plugins.

```js
Zodit.make('#editor', {
	safeMode: true,
	safePluginsList: ['about'],
	extraPlugins: ['yourPluginDev']
});
```
