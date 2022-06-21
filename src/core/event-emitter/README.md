This is the heart of Zodit. All processes inside Zodit mostly flow through events.

```js
const zodit = Zodit.make('#editor');
zodit.e.on('someEvent', param => alert(`Some event fired for ${param}!!!`));
zodit.async.setTimeout(() => {
	zodit.e.fire('someEvent', 'you');
}, 1000);
```

In addition to custom events, the emitter can work with DOM elements and browser events:

```js
zodit.e.on(document.body, 'click', () => alert(`Doc click!!!`));
```

If you don't want to listen to the event anymore, you can unsubscribe from it:

```js
zodit.e
	.one('someEvent', param => alert(`Some event fired for ${param}!!!`))
	.one('someEvent', param => alert(`Some event fired for ${param}!!!`))
	.one('someEvent', param => alert(`Some event fired for ${param}!!!`));

zodit.e.off('someEvent'); // will unsubscribe from all handlers
```

```js
const handler1 = param => alert(`Some event fired for ${param}!!!`);
const handler2 = param => alert(`Some event fired for ${param}!!!`);
const handler3 = param => alert(`Some event fired for ${param}!!!`);

zodit.e
	.one('someEvent', handler1)
	.one('someEvent', handler2)
	.one('someEvent', handler3);

zodit.e.off('someEvent', handler1); // only handler1 will unsubscribe
```
