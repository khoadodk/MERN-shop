import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { createOrUpdateUser } from "../../functions/auth";
import Loading from "../../components/loading/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const history = useHistory();
  const intended = history.location.state;

  const roleBasedDirect = (res) => {
    // check if intened for redirect
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  useEffect(() => {
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history, intended]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedDirect(res);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedDirect(res);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">Welcome to WOODECOR</h4>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className="btn btn-raised mt-4 float-right"
        disabled={!email || password.length < 6}
      >
        Log in with Email
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div>
                {loginForm()}
                <Button
                  type="submit"
                  className="btn mt-1"
                  onClick={googleLogin}
                  icon={<GoogleOutlined />}
                >
                  Log in with Google
                </Button>
              </div>
              <p>
                Don't remember your password? Reset{" "}
                <Link to="/forgot/password">here</Link>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
