import { useState } from "react";
import axios from "axios";

export default function UploadAvatar({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn file trước!");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        "http://192.168.38.34:3000/upload/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Cập nhật ảnh hiển thị
      setAvatarUrl(`${res.data.avatar}?t=${Date.now()}`); // chống cache
      setMessage(res.data.message || "Upload thành công!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload thất bại");
    }
  };

  return (
    <div className="card">
      <h2>Upload Avatar</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            marginTop: 10,
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
