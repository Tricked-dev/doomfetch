import { doomFetch } from '../mod.ts';

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
console.log(data1);
const data2 = await doomFetch('https://google.com').send('text');
console.log(data2);
