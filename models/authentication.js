import user from "models/user";
import password from "models/password";
import { NotFoundError, UnauthorizedError } from "infra/errors/errors";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    if (!providedEmail && !providedPassword) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    const storedUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    throw error;
  }

  async function findUserByEmail(providedEmail) {
    try {
      const [storedUser] = await user.findOneByEmail(providedEmail);
      return storedUser;
    } catch (error) {
      await fakePasswordValidation();
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email não confere.",
          action: "Verifique se este dado está correto.",
        });
      }
      throw error;
    }
  }

  async function validatePassword(providedPassword, storedPassword) {
    try {
      const correctPasswordMatch = await password.compare(
        providedPassword,
        storedPassword,
      );
      if (!storedPassword || !correctPasswordMatch) {
        const isWrongPassword = storedPassword && !correctPasswordMatch;

        if (isWrongPassword) {
          throw new UnauthorizedError({
            message: "Senha de autenticação não confere",
            action: "Verifique se a senha enviada está correta.",
          });
        }

        throw new UnauthorizedError({
          message: "Dados de autenticação não conferem",
          action: "Verifique se os dados enviados estão corretos.",
        });
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Senha de autenticação não confere",
          action: "Verifique se a senha enviada está correta.",
        });
      }
      throw error;
    }
  }

  async function fakePasswordValidation() {
    const dummyHash =
      "$2a$14$z2Z4urVt8Jb/N1Uu8QOkQu6OzMJdDEzAGzkZxvFHy1uq.7jJg/N0S";
    await password.compare("dummyPassword", dummyHash);
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
