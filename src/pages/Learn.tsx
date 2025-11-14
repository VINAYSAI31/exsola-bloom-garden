import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/blogs", { replace: true });
  }, [navigate]);

  return null;
};

export default Learn;
