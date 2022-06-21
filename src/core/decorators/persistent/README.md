Allow save value inside persistent storage as set/get to property

```typescript
import { component, persistent } from './src/core/decorators';

@component
class Item extends UIElement {
	@persistent
	options = {
		some: true
	};
}

const item = new Item(zodit);
console.log(item.options); // {some: true}

item.options = {
	some: false
};

const item2 = new Item(zodit); // or reload page
console.log(item.options); // {some: false}
```
