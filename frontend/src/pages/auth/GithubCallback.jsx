import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

const GithubCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGithub } = useAuthStore();
    const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    const code = params.get("code");

    if (code) {
      loginWithGithub(code).then(() => {
        navigate("/");
      });
    }
  }, []);

  return <div>Logging in with GitHub...</div>;
};

export default GithubCallback;