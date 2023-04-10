import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });


  return (
    <ProtectedRoute>
      <div>
        <div>
          <h2>You are logged in!</h2>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;