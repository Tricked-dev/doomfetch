# DoomFetch

A simple utility to make using fetch "easier" using a class based approach

## Tables of Contents

- [DoomFetch](#doomfetch)
	- [Tables of Contents](#tables-of-contents)
		- [Features:](#features)
		- [Using doomFetch](#using-doomfetch)
			- [Simple Example](#simple-example)
			- [Fetching a image and getting the blob](#fetching-a-image-and-getting-the-blob)
			- [Sending a json body](#sending-a-json-body)
			- [Specifying headers](#specifying-headers)
			- [Retrying](#retrying)
			- [Clone a request](#clone-a-request)
			- [Changing the url path](#changing-the-url-path)
			- [Changing the url](#changing-the-url)
			- [Creating a doomfetch instance from a fetch request](#creating-a-doomfetch-instance-from-a-fetch-request)
			- [Using default request methods](#using-default-request-methods)
	- [Documentation](#documentation)

### Features:

- Easy to use
- Class-Based
- Light-Weight its just a simple wrapper around fetch
- Supports all normal fetch apis + adding queries
- Great typescript support types are automatically generated

### Using doomFetch

```ts
import { doomFetch } from 'https://deno.land/x/doomfetch/mod.ts';
```

#### Simple Example

Get the response and return the json

```ts
import { DenoModuleInterface } from 'somewhere.ts';
await doomFetch<DenoModuleInterface>('https://api.deno.land/modules', 'GET')
	.query('query', 'doomfetch')
	.query('limit', '1')
	//The json has the `DenoModuleInterface` type
	.json();
```

#### Fetching a image and getting the blob

```ts
await doomFetch(
	'https://denolib.github.io/high-res-deno-logo/deno_hr.png'
).send('blob');

//Res.body now has the blob type and is a blob
```

#### Sending a json body

```ts
await doomFetch('https://example.com').body({
	name: 'skyblockdev',
});
```

#### Specifying headers

```ts
await doomFetch('https://example.com')
	.header('Content-Type', 'application/json')
	.text();
```

```ts
await doomFetch('https://example.com')
	.headers({ 'Content-Type': 'application/json' })
	.text();
```

#### Retrying

Ever had to deal with a api that just randomly fails?

```ts
//5 being the amount of times to retry
doomFetch('https://example.com').retry(5).send();
```

#### Clone a request

```ts
const request = doomFetch('https://example.com');
const request2 = request.clone();
```

#### Changing the url path

```ts
doomFetch('https://example.com/cool').setUrlPath('/404');
```

#### Changing the url

```ts
doomFetch('https://example.com/cool').setUrl('https://youtube.com');
```

#### Creating a doomfetch instance from a fetch request

You can use the from method.

```ts
import { DoomFetch } from 'https://deno.land/x/doomfetch/mod.ts';
DoomFetch.from('https://example.com', {
	method: 'get',
	body: JSON.stringify({
		some: 'body',
	}),
});
```

or you can set the request

```ts
const req = doomfetch('https://example.com', 'GET').header('some', 'header');
req.request = {
	headers: {
		newheaders: 'are here',
	},
};
```

#### Using default request methods

Redirect is a default thing and you can access it from doomFetch same for every other option in fetch

```ts
doomFetch('https://example.com').redirect(false);
```

## Documentation

- https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts
