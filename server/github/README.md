# minimal github api wrapper

### Docs:

1. Class init:

```js
const github = new Github("<orgaName>","<OAuthToken>")

--> void
```

-   arguments:
    -   OrgaName or Username: `fosscord`/`xnacly`
-   OAuth token should have `repo` & `user` scopes

2. `getAllRepoNames()`

```js
github.getAllRepoNames()

--> Array<String>
fosscord:
[
  'css-mediaquery',
  'fosscord',
  'fosscord-api',
  'fosscord-cdn',
  'fosscord-client',
  'fosscord-dashboard',
  'fosscord-docs',
  'fosscord-gateway',
  'fosscord-landingpage',
  'fosscord-media',
  'fosscord-plugins',
  'fosscord-server-util',
  'fosscord-support',
  'fosscord-themes',
  'fosscord-ui',
  'fosscord.js',
  'fosscord.js-collection',
  'react-native-withcss'
]
```

-   returns all repositories for `<orgaName>`

3. `getRepoStats(repoName)`

```js
github.getRepoStats("<repoName>")

--> Array<Object>
fosscord-api:
[
	{
    name: 'Flam3rboy',
    additions: 197931,
    deletions: 19151,
    realAdditions: 178780,
    commits: 434,
    additionsPerCommit: 456
  },
  {
    name: 'xNaCly',
    additions: 185579,
    deletions: 3516,
    realAdditions: 182063,
    commits: 21,
    additionsPerCommit: 8837
  },
  {
    name: 'Stefan080106',
    additions: 39,
    deletions: 7,
    realAdditions: 32,
    commits: 3,
    additionsPerCommit: 13
  }
	...
]
```

-   repo should be created or maintained by `<orgaName>`

4. `getOrgStats()`

```js
github.getOrgStats("<repos>","excludeForks<Bool>");

--> Object<Object>
{
  xNaCly: {
    additions: 250475,
    deletions: 85985,
    realAdditions: 164490,
    commits: 870,
    additionsPerCommit: 288
  },
  xnacly1: {
    additions: 19,
    deletions: 42,
    realAdditions: -23,
    commits: 4,
    additionsPerCommit: 5
  },
  Flam3rboy: {
    additions: 2,
    deletions: 2,
    realAdditions: 0,
    commits: 1,
    additionsPerCommit: 2
  }
}
```

-   takes `getAllRepoNames()` in the form of `<repos>` as argument
    > expect long execution times
