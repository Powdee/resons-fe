export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("Registering instrumentation for @vibepot/mocks");
    const { server } = await import("@vibepot/mocks/node");
    server.listen();
  }
}
