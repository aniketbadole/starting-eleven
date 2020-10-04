import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../firebase/auth";

function Login(props) {
  const { register, handleSubmit, reset } = useForm();

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (err) {
      console.log(err);
    }

    if (user) {
      props.history.push(`/profile/${user.uid}`);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `signup-form ${isLoading ? "loading" : ""}`;

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          ref={register}
          required="true"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          ref={register}
          required="true"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>{" "}
      or <Link to="/signup">Sign Up</Link>
    </form>
  );
}

export default Login;
