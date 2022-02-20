# Hello 👋🏻

## Tasks

1. Set up a database to hold the data model (see below)
2. Populate the database with from [migration.csv](./migration.csv)
3. Set up a server that responds to ping ([01-test-ping.sh](./bin/01-test-ping.sh))
4. Add a route for listing users ([02-test-list-users.sh](./bin/02-test-list-users.sh))
5. Add a route for adding a user ([03-test-add-user.sh](bin/03-test-add-user.sh))
6. Add a route for adding a deposit for a user ([04-test-add-deposit.sh](bin/04-test-add-deposit.sh))
7. Update the user list to return the account balance for each user

### You should

- Use TypeScript to complete the tasks
- Create a repository for your code
- Commit **each** task separately
- Test each task with the associated script 

### You can
- Use whatever libraries or frameworks
- Use whatever database (or persistence mechanism)
- Google and stackoverflow as much as you like
- Reuse your own existing code

## Data model

- We have users
- We have deposits
- Users can have zero or more deposits
- Withdrawals are represented as negative deposits
- A user's balance is the sum of their deposits

## Migration data

The migration data consists of a **deposit listing** given by the accounting department.

This listing can be found in the [migration.csv](./migration.csv) file and contains the following:

```csv
alice@example.com,100
bob@example.com,50
alice@example.com,-75
```

In essence the data describes two distinct users, Alice and Bob, with the following deposits:

- Alice deposits 100 money
- Bob deposits 50 money
- Alice withdraws 75 money

## API

### GET /api/ping

#### Response: 200 OK

Should return a "pong":

```json
"pong"
```

#### Example curl

```
curl -sv http://localhost:3000/api/ping
```

### GET /api/users

#### Response: 200 OK

```json
[
  {
    "id": 1,
    "email": "alice@example.com"
  },
  {
    "id": 2,
    "email": "bob@example.com"
  }
]
```

#### Example curl

```
curl -sv http://localhost:3000/api/users
```

### POST /api/users

Request body:

```json
{
  "email": "charlie@example.com"
}
```

#### Response: 201 Created

Should return the user information amended with a newly allocated user ID:

```json
{
  "id": 3,
  "email": "charlie@example.com"
}
```

#### Example curl

```console
curl -sv \
     -d '{"email":"charlie@example.com"}' \
     -H "Content-Type: application/json" \ 
     http://localhost:3000/api/users
```

### POST /api/deposit

#### Request body

```json
{
  "userId": 3,
  "amount": 100,
}
```

#### Response: 201 Created

Should return the deposit information amended with a newly allocated deposit ID:

```json
{
  "id": 4,
  "userId": 3,
  "amount": 100
}
```

#### Example curl

```console
curl -sv \
     -d "'{"id":4,"userId":3"amount":100}'" \
     -H "Content-Type: application/json" \
     http://localhost:3000/api/deposit
```

### GET /api/users (with account balance)

#### Response: 200 Ok

Should return the user information containing the account balance for each user.

```json
[
  {
    "id": 1,
    "email": "alice@example.com",
    "balance": 25
  },
  {
    "id": 2,
    "email": "bob@example.com",
    "balance": 50
  },
  {
    "id": 3,
    "email": "charlie@example.com",
    "balance": 100
  }
]
```

#### Example curl

```
curl -sv http://localhost:3000/api/users
```
