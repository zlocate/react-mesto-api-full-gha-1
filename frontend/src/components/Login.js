import React from "react";

function Login({ onLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(formValue.email, formValue.password);
  }

  return (
    <section className="login__container">
      <h2 className="login__title">Вход</h2>

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        ></input>

        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          autoComplete="on"
          minLength="5"
          onChange={handleChange}
          required
        />

        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
