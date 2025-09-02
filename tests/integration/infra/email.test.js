import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.deleteAllEmails();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await email.send({
      from: "Ryan <ryan@gwalchmei.com.br>",
      to: "dev@gwalchmei.com.br",
      subject: "Teste de Assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Ryan <ryan@gwalchmei.com.br>",
      to: "dev@gwalchmei.com.br",
      subject: "Último email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<ryan@gwalchmei.com.br>");
    expect(lastEmail.recipients[0]).toBe("<dev@gwalchmei.com.br>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
