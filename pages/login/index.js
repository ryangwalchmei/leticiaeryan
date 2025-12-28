import { email, password, useForm } from "@tabnews/forms";
import { tryParseUrl } from "@tabnews/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Flash } from "@tabnews/ui";
import ButtonWithLoader from "pages/interface/components/ButtonWithLoader";

import createErrorMessage from "pages/interface/components/ButtonWithLoader/utils/error-message";
import useUser from "contexts/userContext";
import { Grid, TextField } from "@mui/material";
import { Navbar } from "components/navbar/navbar";

const formConfig = {
  email,
  password,
  globalMessage: "",
  loading: false,
};

export default function Login() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || !user?.id) return;

    const url = tryParseUrl(router.query.redirect);

    if (url.origin === location?.origin) {
      router.replace(url.pathname);
    } else {
      router.replace("/admin");
    }
  }, [user, router]);

  if (isLoading || user?.id) return <></>;

  return (
    <>
      <Navbar />
      <Grid className="loginWrapper">
        <Grid className="loginForm">
          <h2>Login</h2>
          <p>Faça login na sua conta.</p>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
}

function LoginForm() {
  const { fetchUser } = useUser();
  const { getFieldProps, handleSubmit, state, updateState } =
    useForm(formConfig);
  const globalErrorMessage = state.globalMessage.error;

  async function onSubmit(data) {
    updateState({
      globalMessage: { error: null },
      loading: { value: true },
    });

    const { email, password } = data;

    try {
      const response = await fetch(`/api/v1/sessions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        fetchUser();
        return;
      }

      if (response.status === 400) {
        const key = ["email", "password"].includes(responseBody.key)
          ? responseBody.key
          : "globalMessage";

        updateState({
          [key]: { error: createErrorMessage(responseBody) },
          loading: { value: false },
        });
        return;
      }

      updateState({
        globalMessage: { error: createErrorMessage(responseBody) },
        loading: { value: false },
      });
    } catch {
      updateState({
        globalMessage: {
          error:
            "Não foi possível se conectar ao Servidor. Por favor, verifique sua conexão.",
        },
        loading: { value: false },
      });
    }
  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        sx={{
          marginX: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
        }}
      >
        <Grid item sx={{ width: "100%" }}>
          <TextField {...getFieldProps("email")} fullWidth />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <TextField spellCheck {...getFieldProps("password")} fullWidth />
        </Grid>
      </Grid>

      {globalErrorMessage && (
        <Flash variant="success" sx={{ mt: 3 }}>
          {globalErrorMessage}
        </Flash>
      )}

      <ButtonWithLoader
        variant="primary"
        size="large"
        type="submit"
        sx={{ width: "100%", mt: 3 }}
        isLoading={state.loading.value}
      >
        Login
      </ButtonWithLoader>
    </form>
  );
}
