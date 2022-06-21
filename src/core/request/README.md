The module is responsible for sending requests over the network:

```js
const ajax = new Zodit.modules.Ajax(zodit, {
	url: 'https://xdsoft.net'
});

ajax.send().then(resp => console.log(resp.text()));
```

The second argument can be settings [[AjaxOptions]]
