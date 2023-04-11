import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import Progress from "../../components/Progress";

const DashboardPage = () => {

  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return (
      <Progress />
    )
  }

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