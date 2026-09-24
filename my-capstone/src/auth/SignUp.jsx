import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuthStore from "../store/useAuthStore";
import "./Auth.css";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Enter a valid email."),
  password: z.string().min(8, "Password needs at least 8 characters."),
});

function SignUp() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? "/menu";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    // mock signup for now — swap with a real API call when the backend exists
    login({ name: data.fullName, email: data.email });
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="auth-panel">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <span className="field-error">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </div>

        {errors.root && <p className="auth-error">{errors.root.message}</p>}

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default SignUp;
