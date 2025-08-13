import retry from "async-retry";
import database from "infra/database";
import { faker } from "@faker-js/faker";
import user from "models/user";
import session from "models/session";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

async function runMigrationsPending() {
  try {
    const res = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Erro ao rodar migrations: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao rodar migrations:", error);
  }
}

async function createUser(userObject) {
  return await user.create({
    username:
      userObject?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || "validpassword",
    avatarsrc: "example.jpg",
  });
}

async function createSession(userId) {
  return await session.create(userId);
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runMigrationsPending,
  createUser,
  createSession,
};

export default orchestrator;
