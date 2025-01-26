# Server Setup

This project is a Node.js + TypeScript-based API for managing pharmacy-related data, connecting to a MongoDB database hosted on MongoDB Atlas. The API allows fetching data from the `medicines` collection.

## Prerequisites

Make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/) (v16 or later)
2. [npm](https://www.npmjs.com/) (bundled with Node.js)
3. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a configured database and collection.
4. Create a database and collection , then import medicines.json file

---

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 1. Clone the Repository

Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root folder and add the following variables:

```bash
DB_USER=baustcse160201103
DB_PASSWORD=publ8U73HzAg8xPz
```

Explanation of Variables:

- DB_USER: Your MongoDB Atlas username.
- DB_PASSWORD: Your MongoDB Atlas password.
- API_SECRET_CODE: An optional API secret (not used in this project but reserved for future security).

### 4. Start the Server

```bash
npm start
```
