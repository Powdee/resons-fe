import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
// const schema = a.schema({
//   Event: a
//     .model({
//       content: a.string(),
//       isDone: a.boolean(),
//       priority: a.enum(['low', 'medium', 'high']),
//     })
//     .authorization((allow) => [allow.owner()]),
// });

// create schema from this sql
// -- name: CreateEvent :one
// INSERT INTO events (title, description, created_by, start_date, end_date, hashtag_id, location)
// VALUES ($1, $2, $3, $4, $5, $6, $7)
// RETURNING *;

// -- name: GetEventByID :one
// SELECT * FROM events
// WHERE event_id = $1;

// -- name: UpdateEvent :exec
// UPDATE events
// SET title = $2, description = $3, start_date = $4, end_date = $5, hashtag_id = $6, location = $7
// WHERE event_id = $1;

// -- name: DeleteEvent :exec
// DELETE FROM events
// WHERE event_id = $1;

// -- name: ListEvents :many
// SELECT * FROM events
// ORDER BY created_at DESC;

// -- name: GetEventByHashtag :one
// SELECT e.*
// FROM events e
// JOIN hashtags h ON e.hashtag_id = h.hashtag_id
// WHERE h.tag = $1;

const schema = a.schema({
  User: a
    .model({
      username: a.string(),
      email: a.string(),
      created_at: a.string(),
      role: a.enum(['admin', 'user']),
    })
    .authorization((allow) => [allow.owner()]),
  Event: a
    .model({
      title: a.string(),
      description: a.string(),
      startDate: a.date(),
      endDate: a.date(),
      hashtagId: a.id(),
      hashtag: a.belongsTo('Hashtag', 'hashtagId'),
      location: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['ADMIN']).to(['read', 'update', 'delete']),
    ]),
  Hashtag: a
    .model({
      events: a.hasOne('Event', 'hashtagId'),
      tag: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.groups(['ADMIN']).to(['read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
