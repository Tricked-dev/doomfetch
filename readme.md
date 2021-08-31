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

# Documentation

- https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts
