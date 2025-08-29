import { useState } from "react";
import { updateProfile } from "../services/authAPI";
import { AxiosError } from "axios";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, email, password });
      alert(res.message);
    } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response) {
        alert("Gagal update: " + error.response.data.message);
    } else {
        alert("Gagal update: " + error.message);
    }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profil</h2>
      <input
        type="text"
        placeholder="Nama baru"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email baru"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password baru"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}
