
# group10-project
## 🧑‍💻 Thông tin cá nhân
- **Họ tên:** Võ Hiếu Quý  
- **Vai trò:** Sinh viên 3 — Database Engineer  
- **Nhánh làm việc:** `feature-database`

---

## 🎯 Nhiệm vụ chính
1. Thiết kế cấu trúc cơ sở dữ liệu MongoDB cho dự án.  
2. Tạo các **model** (schema) sử dụng **Mongoose**.  
3. Thiết lập **kết nối MongoDB** với backend (Node.js + Express).  
4. Hỗ trợ backend trong việc xử lý các thao tác CRUD (Create, Read, Update, Delete).  
5. Đảm bảo dữ liệu hoạt động ổn định và nhất quán trong quá trình phát triển.

---

## 🧰 Công cụ sử dụng
| Công cụ | Mục đích |
|----------|-----------|
| **MongoDB** | Lưu trữ dữ liệu chính |
| **Mongoose** | Kết nối và định nghĩa schema |
| **Node.js (LTS)** | Chạy môi trường backend |
| **Visual Studio Code** | Viết và quản lý mã nguồn |
| **Git & GitHub** | Quản lý phiên bản và làm việc nhóm |

---

## ⚙️ Các bước thực hiện

### 1️⃣ Tạo nhánh làm việc riêng
Từ nhánh `develop`, tạo nhánh riêng cho phần database:
```bash
git checkout develop
git pull origin develop
git checkout -b feature-database
git push -u origin feature-database
