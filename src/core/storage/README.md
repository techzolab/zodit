The module is designed to save information to the user's local storage.
At startup, it is checked whether the user has allowed saving to persistent storage.

> If not allowed, the module will use the [[MemoryStorageProvider]] strategy.

```js
const zodit = Zodit.make('#editor');
zodit.storage.set('someKey', 1);

// reload page

zodit.storage.get('someKey'); // 1
```
