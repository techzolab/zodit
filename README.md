# Zodit Editor 1

An excellent WYSIWYG editor written in pure TypeScript without the use of additional libraries. Its file editor and image editor.

## Get Started

## How use

Download the latest [release](https://github.com/techzolab/zodit/releases/latest) or

### INSTALL VIA NPM

```bash
npm i @techzolab/zodit
```

or

```bash
yarn add @techzolab/zodit
```

### Include just two files

ES5 Version

```html
<link type="text/css" rel="stylesheet" href="build/zodit.min.css" />
<script type="text/javascript" src="build/zodit.min.js"></script>
```

ES2018 Version (if your users use only modern browsers)

```html
<link type="text/css" rel="stylesheet" href="build/zodit.es2018.min.css" />
<script type="text/javascript" src="build/zodit.es2018.min.js"></script>
```

### Use a CDN

```html
<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/zodit/3.18.2/zodit.es2018.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zodit/3.18.2/zodit.es2018.min.js"></script>
```

### USAGE

And some `<textarea>` element

```html
<textarea id="editor" name="editor"></textarea>
```

After this, you can init Zodit plugin

```javascript
var editor = Zodit.make('#editor');
editor.value = '<p>start</p>';
```

or

```javascript
const editor = Zodit.make('#editor');
editor.value = '<p>start</p>';
```

with jQuery

```javascript
$('textarea').each(function () {
	var editor = Zodit.make(this);
	editor.value = '<p>start</p>';
});
```

## For contributors:

```bash
git clone https://github.com/techzolab/zodit.git
cd zodit
npm install
```

Run webpack Hot Reload server:

```bash
npm start
```

Demo will be available here

```
http://localhost:2000/
```

Build min files:

```bash
npm run build
```

Run tests:

```bash
karma start --browsers ChromeHeadless,IE,Firefox karma.conf.js
```

or

```bash
npm test
```

or

```bash
yarn test
```

For checking tests in browser, open URL:

```
http://localhost:2000/test/test.html
```

For testing FileBrowser and Uploader modules, need install [PHP Connector](https://github.com/techzolab/zodit-connectors)

```bash
composer create-project --no-dev zodit/connector
```

Run test PHP server

```bash
php -S localhost:8181 -t ./
```

and set options for Zodit:

```javascript
var editor = Zodit.make('#editor', {
	uploader: {
		url: 'http://localhost:8181/index-test.php?action=fileUpload'
	},
	filebrowser: {
		ajax: {
			url: 'http://localhost:8181/index-test.php'
		}
	}
});
```

### Create plugin

```javascript
Zodit.plugins.yourplugin = function (editor) {
	editor.events.on('afterInit', function () {
		editor.s.insertHTMl('Text');
	});
};
```

### Add custom button

```javascript
var editor = Zodit.make('.someselector', {
	extraButtons: [
		{
			name: 'insertDate',
			iconURL: 'http://techzolab.net/opensource/zodit/logo.png',
			exec: function (editor) {
				editor.s.insertHTML(new Date().toDateString());
			}
		}
	]
});
```

or

```javascript
var editor = Zodit.make('.someselector', {
	buttons: ['bold', 'insertDate'],
	controls: {
		insertDate: {
			name: 'insertDate',
			iconURL: 'http://techzolab.net/opensource/zodit/logo.png',
			exec: function (editor) {
				editor.s.insertHTML(new Date().toDateString());
			}
		}
	}
});
```

button with plugin

```javascript
Zodit.plugins.add('insertText', function (editor) {
	editor.events.on('someEvent', function (text) {
		editor.s.insertHTMl('Hello ' + text);
	});
});

// or

Zodit.plugins.add('textLength', {
	init(editor) {
		const div = editor.create.div('zodit_div');
		editor.container.appendChild(div);
		editor.events.on('change.textLength', () => {
			div.innerText = editor.value.length;
		});
	},
	destruct(editor) {
		editor.events.off('change.textLength');
	}
});

// or use class

Zodit.plugins.add(
	'textLength',
	class textLength {
		init(editor) {
			const div = editor.create.div('zodit_div');
			editor.container.appendChild(div);
			editor.events.on('change.textLength', () => {
				div.innerText = editor.value.length;
			});
		}
		destruct(editor) {
			editor.events.off('change.textLength');
		}
	}
);

var editor = Zodit.make('.someselector', {
	buttons: ['bold', 'insertText'],
	controls: {
		insertText: {
			iconURL: 'http://techzolab.net/opensource/zodit/logo.png',
			exec: function (editor) {
				editor.events.fire('someEvent', 'world!!!');
			}
		}
	}
});
```

## Browser Support

-   Internet Explorer 11
-   Latest Chrome
-   Latest Firefox
-   Latest Safari
-   Microsoft Edge

## License

MIT
