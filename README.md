# Gym Management System

## Installation and Usage Guide Front End

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Node Package Manager).
- You have a terminal or command-line access.
- You have access to the Git repository containing the project files.

### Installation

Follow these steps to set up the Gym Management System on your local machine:

1. **Clone the repository**:
   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/PhuNd2k3/GymManagement.git
   ```

2. **Navigate to the project directory**:
   Change your current directory to the project's root directory:

   ```bash
   cd Front-End
   ```

3. **Install dependencies**:
   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```
### Run project
   ```bash
   npm start
   ```

## Installation and Usage Guide Back End

### Prerequisites
Before you begin, ensure you have met the following requirements:

- You have installed JDK 17.
- You have installed IntelliJ IDEA (or another preferred Java IDE).
- You have a terminal or command-line access.

### Installation
Follow these steps to set up the Gym Management System backend on your local machine:

1. **Clone the repository**:
   Open your terminal and run the following command to clone the repository if you haven't already:

   ```bash
   git clone https://github.com/PhuNd2k3/GymManagement.git
   ```

2. **Configure JDK**:
Ensure that your project is using JDK 17:

- If you using IntelliJ IDEA:
Go to File > Project Structure > Project Settings > Project.

- Set the Project SDK to JDK 17. If JDK 17 is not listed, you need to add it by clicking on New... and navigating to where JDK 17 is installed on your machine.

3. **Configure Database**:
### Configure Database:

Follow these steps to configure the database for the Gym Management System:

- Install MySQL:
   If you haven't already, download and install MySQL from the official website: [MySQL Downloads](https://dev.mysql.com/downloads/).

- Start MySQL Server:
   Start the MySQL server on your local machine with user root and password admin.

- Create a Schema:

   ```sql
   CREATE SCHEMA gym-management;
   ```

### Run Application
- In your IDE, navigate to the src/main/java directory.
- Locate the main application file, typically named GymManagementApplication.java.
Right-click on the file and select Run 'GymManagementApplication'.

