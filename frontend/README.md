# Github-Stats-Frontend

## Host localy:

-   create an OAuth App, copy its client id to config.json

```json
{
	"production": 0,
	"paths": ["http://localhost:1234", "<url>"],
	"client_id": ""
}
```

```bash
npm i
npm start
```

## Sites overview:

-   Landingpage:

    -   displays an overview over the project and its use cases
    -   displays some users and orgas

-   Oauth:

    -   handles the conversion of the temp oauth token to a real github access
        token
    -   provides the user with a feedback in form of an custom alert

-   Orga:
    -   displays a overview over the total users or orgas stats
    -   displays a overview over each contributors stats
