# DoomFetch

A simple utility to make using fetch "easier" using a class based approach

## Tables Of Contents

    - [Features](#features)
    - [Using](#using-doomfetch)
    - [Examples](#simple-example)
    - [More Examples](#fetching-a-image-and-getting-the-blob)
    - [Documentation](#Documentation)

### features:

- Simple
- Class-Based
- Light-Weight
- Supports all normal fetch apis + adding queries
- Great typescript support types are automatically generated

### Using doomFetch

```ts
import { doomFetch } from 'https://deno.land/x/doomfetch/mod.ts';
```

### Simple Example

Get the response and return the json

```ts
import { DenoModuleInterface } from 'somewhere.ts';
await doomFetch<DenoModuleInterface>('https://api.deno.land/modules', 'GET')
	.query('query', 'doomfetch')
	.query('limit', '1')
	//The json has the `DenoModuleInterface` type
	.json();
```

### Fetching a image and getting the blob.

```ts
const res = await doomFetch(
	'https://denolib.github.io/high-res-deno-logo/deno_hr.png'
).send('blob');

//Res.body now has the blob type and is a blob
res.body;
```

Sending a json body

```ts
await doomFetch('https://example.com')
	.body({
		name: 'skyblockdev',
	})
	.send('text');
```

Specify headers

```ts
await doomFetch('https://example.com')
	.header('Content-Type', 'application/json')
	.headers({ 'Content-Type': 'application/json' })
	.text();
```

More examples

```ts
//Promise<Blob>
const res = await doomFetch('https://duckduckgo.com', 'GET')
	.header('from', 'doomfetch :)')
	//Simple shortcuts to not have todo .then(r=> r.json()) instead just use .json() or .Blob() or any of those methods
	.blob();
//Promise<Response>
const res = await doomFetch('https://duckduckgo.com', 'GET')
	.redirect(true)
	//Not specifying anything just returns a regular response
	.send();
```

```ts
const data = await doomFetch(
	'https://deno.land/x/doomfetch/mod.ts',
	'GET'
).send('text');
console.log(data.body);

const data1 = await doomFetch('https://someapilockedwithheaders', 'POST')
	.body({
		input: 'some sentence',
	})
	.header('api-key', 'cool key')
	.headers({
		'content-type': 'appilication/json',
		'authorization': 'Bearer cool api key again',
	})
	.text();
```

## Documentation

- https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts
