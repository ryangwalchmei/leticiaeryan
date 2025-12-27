import retry from "async-retry";
import database from "infra/database";
import { faker } from "@faker-js/faker";
import user from "models/user";
import session from "models/session";
import invitation from "models/invitation";
import guests from "models/guest";
import notifications from "models/notification";

const emailHttpUrl = `${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

async function waitForAllServices() {
  await waitForWebServer();
  await waitForEmailServer();

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

  async function waitForEmailServer() {
    return retry(fetchEmailPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);
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

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListReponse = await fetch(`${emailHttpUrl}/messages`);
  const emailListBody = await emailListReponse.json();
  const lastEmailItem = emailListBody.pop();

  if (!lastEmailItem) {
    return null;
  }

  const emailTextReponse = await fetch(
    `${emailHttpUrl}/messages/${lastEmailItem.id}.plain`,
  );
  const emailTextBody = await emailTextReponse.text();

  lastEmailItem.text = emailTextBody;
  return lastEmailItem;
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

function extractUUID(text) {
  const match = text.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/g,
  );
  return match ? match[0] : null;
}

async function activateUser(inactiveUser) {
  return await user.setFeatures(inactiveUser.id, [
    "create:session",
    "read:session",
  ]);
}

async function createInvitation(invitationObject) {
  return await invitation.createInvitation({
    name: invitationObject?.name || faker.company.name(),
    pin_code:
      invitationObject?.pin_code ||
      faker.number.int({
        min: 1000,
        max: 99999,
      }),
    status: invitationObject?.status || "pendente",
  });
}

async function createGuest(guestObject, invitationId) {
  let invitationCreated;
  if (!invitationId) {
    invitationCreated = await createInvitation({
      name: faker.company.name(),
    });
  }
  return await guests.createGuests({
    name: guestObject?.name || faker.person.fullName(),
    email: guestObject?.email || faker.internet.email(),
    cell:
      guestObject?.cell ||
      faker.phone.number({
        style: "human",
      }),
    is_family: faker.datatype.boolean(),
    is_friend: faker.datatype.boolean(),
    is_musician: faker.datatype.boolean(),
    is_witness: faker.datatype.boolean(),
    is_bridesmaid: faker.datatype.boolean(),
    is_bestman: faker.datatype.boolean(),
    is_bride: faker.datatype.boolean(),
    is_groom: faker.datatype.boolean(),
    guest_of: null,
    invitation_id: invitationId || invitationCreated.id,
  });
}

async function createNotification(guestId, notificationObject) {
  let invitationCreated;
  let guestCreated;
  if (!guestId) {
    guestCreated = await createGuest();

    guestId = guestCreated.id;
    invitationCreated = await invitation.getInvitation(
      guestCreated.invitation_id,
    );
  }

  return await notifications.createNotifications({
    title: notificationObject?.title || "Presença Confirmada",
    message:
      notificationObject?.message ||
      `${guestCreated.name} confirmou presença no convite ${invitationCreated.name}`,
    type: notificationObject?.type || "Info",
    guest_id: guestId,
  });
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runMigrationsPending,
  createUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID,
  activateUser,
  createInvitation,
  createGuest,
  createNotification,
};

export default orchestrator;
