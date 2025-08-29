import { useEffect, useState } from "react";
import { getProfile } from "../services/authAPI";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log("API response:", res);
        setUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Profil</h1>

      {user ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body">
                <h4 className="card-title mb-3">Informasi Akun</h4>
                <p className="card-text">
                  <strong>Nama:</strong> {user.name}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="card-footer text-muted text-center">
                User ID: {user.id}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Memuat data profil...</p>
        </div>
      )}
    </div>
  );
}
