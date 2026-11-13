import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/health", async () => ({ status: "ok" }));

const port = Number(process.env.PROXY_PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });
