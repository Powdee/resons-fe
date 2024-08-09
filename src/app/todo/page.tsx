import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../amplify/data/resource';

// This is a Server Component
export default async function TodosPage() {
  const client = generateClient<Schema>(); // Initialize the Data client

  // Fetch the list of todos
  const { data: todos } = await client.models.Todo.list();

  // Return a list of todos
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
