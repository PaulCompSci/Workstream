
# 📂 Blacklisted Phone Number Manager (Workstream Take Home Assignment) 

Welcome to the **Blacklisted Phone Number Manager**! This application allows users to upload `.csv` files containing phone numbers, which are then processed, stored, and displayed in a blacklist table for further management.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Demo](#screenshots--demo)
- [Technologies](#technologies)

---

## Overview

The **CSV File Upload & Blacklist Manager** is a web application that provides functionality to upload `.csv` files, validate them, and store valid phone numbers in a blacklist database. The application also includes a UI to view and manage these blacklisted phone numbers.

---

## 🚀 Features

- 📁 **File Upload:** Upload CSV files containing phone numbers.
- 🔍 **Validation:** Ensures only `.csv` files are uploaded.
- 📜 **Database Management:** Save, delete, and display blacklisted phone numbers.
- 🔄 **Dynamic Update:** Automatically reloads to update the displayed blacklist.
- ❌ **Error Handling:** User-friendly alerts for upload failures, invalid files, and more.

---

## 🛠️ Installation

### 1. **Clone the Repository**
   ```bash
   git clone https://github.com/PaulCompSci/Workstream.git
   ```

### 2. **Setup Environment Variables**
   Create a `.env` file with the following variables:

   ```bash
   DB_HOST=127.0.0.1
   DB_PORT=(PostgreSQL port number)
   DB_USERNAME=(PostgreSQL username)
   DB_PASSWORD=(PostgreSQL password)
   DB_NAME=(database name)
   ```

### 3. **Configure Server Port**
   In the `server/src/main.ts` file, change the line:

   ```typescript
   await app.listen(process.env.PORT ?? 2899);
   ```

   Change `2899` to the desired port number for your server.

### 4. **Start the Server**
   Run the following command to start the server:

   ```bash
   npm run start:dev
   ```

### 5. **Test the Import Script**
   To test the import script, navigate to:

   ```
   http://localhost:(your server port number)/black-listed-phnumber/import
   ```

   This will import the `.csv` file provided in the assignment PDF.

---

## 🌐 Web Application with NestJS Backend and React Frontend

To demonstrate my understanding of both NestJS (backend) and React (frontend) and how they interact with each other , I've additionally built a web application. Follow these steps to run it:

1. **Continue from above** setup instructions.
2. **Navigate to the client directory:**
   ```bash
   cd client
   npm run dev
   ```
3. **Access the Web Application**
   Use the link provided in the terminal to open the web application.

---

## 🎥 Demo

Explore the functionality of our web application in the videos below, showcasing how the platform processes and manages blacklisted phone numbers effectively.

- **Script Demo:** A walkthrough of how the script work
  [Watch the Script Demo](https://youtu.be/2gZid27ryx8)

- **Web Application Demo:** A demonstration of the full web app in action. 
  [Watch the Web App Demo](https://youtu.be/E7dEl-Dx5yo)

---

## 💻 Technologies

- **Backend:** NestJS, TypeORM
- **Frontend:** React
- **Database:** PostgreSQL

