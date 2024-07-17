export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col items-center space-y-4"
        action="/auth/login"
        method="POST"
      >
        <label className="flex flex-col space-y-1">
          <span>Email</span>
          <input type="email" required />
        </label>
        <button type="submit" className="btn">
          Send magic link
        </button>
      </form>
    </main>
  );
}
