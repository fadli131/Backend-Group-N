# GROUP N FINAL PROJECT 

## Getting Started

### 1. Prerequisites

First, make sure you already have:

- Git installed.
- Node.js and npm installed.
- A text editor or IDE (e.g., Visual Studio Code).
- Postman installed, to testing server endpoint

### 2. Clone the Repository

- Firstly, clone this repository to local repository
```bash
git clone <repository-url>
cd <repository-folder-name>
```

### 3. Install all required packages dependencies

```bash
npm install
```

### 4. Starting the project locally

- Copy the env files
```
cp .env.example .env
```

- Change MONGO_URL to your MONGO connection

- Add permission to db
```
npm run make_perm
```

- Run Backend Server

```bash
npm start
```

### 5. Authentication and EndPoint 
| Controllers         | Routes                                      | Functionality                               |
|---------------------|-------------------------------------------- |---------------------------------------------|
| authController      | `/login, /register`                         | Authenticate login and regist account             |
| eventController     | `/, /:id`                                   | To perform PUSH, GET, PUT, DEL events       |
| newsController      | `/, /:id, /user/me`                         | To perform PUSH, GET, PUT, DEL news         |
| programController   | `/, /:id`                                   | To perform PUSH, GET, PUT, DEL program      |
| userController      | `/, /:id, /add-role/:id, /remove-role/:id`  | Ensure Role-Based Access Control (RBAC)     |

### 6. Access Permissions 
| Role   | Collection                   | Allowed Methods              |
|--------|------------------------------|------------------------------|
| admin  | users, event, news, program  | get, post, put, delete       |
| staff  | event, news, program         | get, post, put, delete       |
| member | users, event, news, program  | get                          |

