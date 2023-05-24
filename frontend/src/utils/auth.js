class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res;
      })
      .then(this._handleResponse);
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  }

  getToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        headers: this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res;
      })
      .then(this._handleResponse);
  }
}

const useAuth = new Auth({
  url: "https://domainname.anastasiya.nomoredomains.monster",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default useAuth;
