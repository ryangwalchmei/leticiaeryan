import { Navbar } from "components/navbar/navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import FormInput from "components/formInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const emailAdm = process.env.NEXT_PUBLIC_ADM_EMAIL;
      const passwordAdm = process.env.NEXT_PUBLIC_ADM_PASSWORD;

      if (email !== emailAdm || password !== passwordAdm) {
        console.log({ emailAdm });

        setError("Credenciais inválidas.");
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.log(err);
      setError("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="MuiGrid-root loginWrapper css-rfnosa">
        <div className="MuiGrid-root loginForm css-rfnosa">
          <h2>Login</h2>
          <p>Apenas para os administradores</p>
          <form onSubmit={handleLogin}>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
              <FormInput
                label="E-mail"
                id="email"
                name="email"
                placeholder="E-mail"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label="Senha"
                id="password"
                name="Senha"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="error-message" style={{ color: "red" }}>
                  {error}
                </div>
              )}
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0">
                <div className="MuiGrid-root formFooter css-rfnosa">
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-fullWidth cBtnTheme css-1kol59t"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
