Every Zodit element inherits from [[Component]], and implements the [[IComponent]] interface accordingly.

Such elements have a name

```js
const zodit = Zodit.male('#editor');
console.log(zodit.componentName);
console.log(zodit.statusbar.componentName);
console.log(zodit.filebrowser.componentName);
console.log(zodit.uploader.componentName);
```

And also each component has its current [[STATUSES | status]]:

```js
const zodit = Zodit.male('#editor');
console.log(zodit.componentStatus);
```

You can work on changes in the status of a component through the decorator [[decorators/hook]]
either through the method [[Component.hookStatus]]

```ts
import { Component } from 'zodit/src/core/component';

export class SomeComponent extends Component {}
const cmp = new SomeComponent();

cmp.hookStatus('ready', () => {
	console.log('Hello world on ready = )');
});
```

To set the status, it is enough to call the method [[Component.setStatus]]

```ts
import { Component } from 'zodit/src/core/component';

export class SomeComponent extends Component {}
const cmp = new SomeComponent();
cmp.setStatus('ready');
```

The component itself can automatically set the ready status:

```ts
import type { IZodit } from 'zodit/src/types';
import { Component } from 'zodit/src/core/component';

export class SomeComponent extends Component {
	constructor(zodit: IZodit) {
		super(zodit);
		cmp.setStatus('ready');
	}
}

const cmp = new SomeComponent();
console.log(cmp.isReady);
```

But it’s better not to do this, because with inheritance, such a component will be “ready” ahead of time:

```ts
import type { IZodit, IStatusBar } from 'zodit/src/types';
import { Component } from 'zodit/src/core/component';
import { StatusBar } from 'zodit/src/modules';

export class SomeComponent extends Component {
	constructor(zodit: IZodit) {
		super(zodit);
		cmp.setStatus('ready');
	}
}

export class SomeAnotherComponent extends SomeComponent {
	public status: IStatusBar;

	constructor(zodit: IZodit) {
		super(zodit);
		console.log(this.isReady); // true
		// Errors are possible here, since the status of the component is already 'ready' but you have not yet initialized its fields
		this.status = new StatusBar(zodit);
	}
}
```

Therefore, it is better to use a decorator [[core/decorators/component]]

```ts
import type { IZodit, IStatusBar } from 'zodit/src/types';
import { Component } from 'zodit/src/core/component';
import { StatusBar } from 'zodit/src/modules';
import { component } from 'zodit/src/core/decorators';

@component()
export class SomeComponent extends Component {}

@component()
export class SomeAnotherComponent extends SomeComponent {
	public status: IStatusBar;

	constructor(zodit: IZodit) {
		super(zodit);
		console.log(this.isReady); // false
		this.status = new StatusBar(zodit);
	}
}

const cmp = new SomeAnotherComponent();
console.log(cmp.isReady); // true
```
