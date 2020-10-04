import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../../firebase/auth";
import { Link } from "react-router-dom";

function Signup(props) {
  const { register, handleSubmit, reset } = useForm();

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();
    } catch (err) {
      console.log(err);
    }

    if (newUser) {
      props.history.push(`/profile/${newUser.uid}`);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `signup-form ${isLoading ? "loading" : ""}`;

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label htmlFor="inlineFormInputName2">First name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              ref={register}
            />
          </div>
          <div className="col">
            <label htmlFor="inlineFormInputName2">Last name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              ref={register}
            />
          </div>
        </div>
      </div>
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
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Signup
      </button>{" "}
      or <Link to="/login">Login</Link>
    </form>
  );
}

export default Signup;
