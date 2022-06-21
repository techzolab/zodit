# Zodit UI Popup

The module is used to create pop-up windows next to interface elements.

```js
import { Popup } from 'zodit/src/core/ui';

const popup = new Popup(zodit);
popup.setContent('Hello world').open(() => ({
	left: 100,
	top: 200
}));

popup.close();
```
