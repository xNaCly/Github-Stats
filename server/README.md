# Github-Stats-Backend

[Github API wrapper docs](./github/README.md)

## Host localy:

-   get yourself a free mongodb db, copy its uri to config.json
-   choose a port, copy it to config.json
-   create an OAuth App, copy its client secret to config.json

```json
{
	"db": "mongodb+srv://?retryWrites=true&w=majority",
	"port": 1234,
	"client_secret": "",
	"options": {
		"excludeForks": true
	}
}
```

```bash
npm i
npm start
```

## REST usage:

1. get total stats for a org:

```js
GET <url>:<port>/total/<orgaName>
Headers:
	Authorization: OAuth token

example:
curl localhost:1234/total/fosscord -H "Authorization: <12345678910>"

-->
{
	"Flam3rboy": {
			"additions":432102,
			"deletions":648486,
			"realAdditions":-216384,
			"commits":234,
			"additionsPerCommit":1847
	},
	"Intevel": {
		"additions":234,
		"deletions":208,
		"realAdditions":26,
		"commits":7,
		"additionsPerCommit":33
	},
	"xNaCly": {
		"additions":6620,
		"deletions":3632,
		"realAdditions":2988,
		"commits":67,
		"additionsPerCommit":99
	}
}
```

2. exchange temp OAuth token for access token with github:

```js
GET <url>:<port>/login/<client_id>/<tempCode>

example:
curl localhost:1234/login/12345678910/12345678910

-->
forward of github response...
```

3. get User data from authorized user

```js
GET <url>:<port>/user
Headers:
	Authorization: OAuth token

-->
{
	"avatar":"https://avatars.githubusercontent.com/u/47723417?v=4",
	"url":"https://github.com/xNaCly",
	"name":"xNaCly"
}
```
