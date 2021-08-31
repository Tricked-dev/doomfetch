# DoomFetch

A simple utility to make using fetch "easier" using a class based approach

features:

- Simple
- Class-based
- light-weight
- Supports all normal fetch apis + adding queries

### sinple example

```ts
import { doomFetch } from 'https://deno.land/x/doomfetch/mod.ts';
import { DenoModuleInterface } from 'somewhere.ts';
const res = await doomFetch<DenoModuleInterface>(
	'https://api.deno.land/modules',
	'GET'
)
	.query('query', 'doomfetch')
	.queryMore({
		limit: '1',
	})
	.json();
console.log(res.data.results[0]);
```

```ts
//Promise<Blob>
const res = await doomFetch('https://duckduckgo.com', 'GET')
	.header('from', 'doomfetch :)')
	//Simple shortcuts to not have todo .then(r=> r.json()) instead just use .json() or .Blob() or any of those methods
	.blob();
//Promise<Response>
const res = await doomFetch('https://duckduckgo.com', 'GET')
	.redirect(true)
	.send();
```

# Documentation

- https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts
