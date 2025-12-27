import { Navbar } from "components/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Link from "next/link";
import SimpleReactValidator from "simple-react-validator";
import { showToast } from "components/toasts";
import fetchAPI from "contexts/utils/fetchAPI";

export default function Login() {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await fetchAPI("/api/v1/user");
        replace("/admin");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function handleLogin(formValues) {
    try {
      const loginResponse = await fetchAPI(`/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      return { success: true, data: loginResponse };
    } catch (error) {
      return { success: false, error };
    }
  }

  const [value, setValue] = useState({
    email: "user@gmail.com",
    password: "123456",
    remember: false,
  });
  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const rememberHandler = () => {
    setValue({ ...value, remember: !value.remember });
  };
  const [validator] = useState(
    new SimpleReactValidator({
      className: "errorMessage",
    }),
  );

  const submitForm = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      const loginObject = await handleLogin({
        email: value.email,
        password: value.password,
      });

      if (loginObject.success) {
        validator.hideMessages();
        showToast({
          icon: "success",
          title: "Você efetuou login com sucesso!",
        });
        replace("/admin");
      } else {
        validator.showMessages();
        showToast({
          icon: "error",
          title: loginObject.error.message,
          text: loginObject.error.action,
        });
      }
    }
  };

  if (loading) return <></>;

  return (
    <>
      <Navbar />
      <Grid className="loginWrapper">
        <Grid className="loginForm">
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <form onSubmit={submitForm}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className="inputOutline"
                  fullWidth
                  placeholder="E-mail"
                  value={value.email}
                  variant="outlined"
                  name="email"
                  label="E-mail"
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
                />
                {validator.message("email", value.email, "required|email")}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="inputOutline"
                  fullWidth
                  placeholder="Password"
                  value={value.password}
                  variant="outlined"
                  name="password"
                  type="password"
                  label="Password"
                  onBlur={(e) => changeHandler(e)}
                  onChange={(e) => changeHandler(e)}
                />
                {validator.message("password", value.password, "required")}
              </Grid>
              <Grid item xs={12}>
                <Grid className="formAction">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value.remember}
                        onChange={rememberHandler}
                      />
                    }
                    label="Remember Me"
                  />
                  <Link href="/forgot-password">Forgot Password?</Link>
                </Grid>
                <Grid className="formFooter">
                  <Button fullWidth className="cBtnTheme" type="submit">
                    Login
                  </Button>
                </Grid>
                <p className="noteHelp">
                  Don`&apos;`t have an account?
                  <Link href="/register">Create free account</Link>
                </p>
              </Grid>
            </Grid>
          </form>
          <div className="shape-img">
            <i className="fi flaticon-honeycomb"></i>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
