#Email Marketing Sequence Builder (MERN Stack)
This project is an email marketing sequence builder application built using the MERN stack (MongoDB, Express.js, React, and Node.js). 
It allows users to visually design email marketing sequences using a flowchart interface built with the React Flow library.
The backend utilizes Agenda for scheduling emails and Nodemailer for sending emails.

#Features:
  1. Visual Flowchart: Users can add and remove nodes to design email marketing sequences with Cold Emails, Wait/Delay, and Lead Source nodes.
  2. Email Scheduling: Emails are scheduled based on the time of saving and the "Wait/Delay" nodes.
  3. Email Sending: Emails are sent using Nodemailer after the specified time delay.
  4. Backend API: A [POST] API is created to handle email scheduling with details like email body, subject, and recipient email address.

#Tech Stack:
  1. Frontend: React, React Flow
  2. Backend: Node.js, Express.js, Agenda, Nodemailer
  3. Database: MongoDB
  4. Other Libraries: React Flow (for flowchart interface), Agenda (for scheduling), Nodemailer (for sending emails)

#Features Implementation:
  1. Flowchart Interface (Frontend): The React Flow library is used to create the flowchart interface where users can add and remove nodes
      such as "Cold Email", "Wait/Delay", and "Lead Source". The sequence is saved with timestamps for scheduling email sends.
  2. Email Scheduling (Backend): The Agenda library is used to schedule emails based on the "Wait/Delay" node timestamps.
     A [POST] API is created where the request body contains the email subject, body, recipient, and the time for scheduling.
  3. Email Sending (Backend): Emails are sent using Nodemailer. Once the scheduled time is reached, the email is sent to the recipient via SMTP.

#Bonus Features
  1. Authentication: The application includes authentication for user login and access to the email sequence builder. (Optional: JWT authentication can be implemented).
  2. Unit Tests: Unit tests are written to test the backend API and the flowchart logic.
  3. Documentation: The project includes setup documentation and code comments to make the application easy to understand and extend.


Here's a sample README file for your GitHub repository based on the task you completed:

Email Marketing Sequence Builder (MERN Stack)
This project is an email marketing sequence builder application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to visually design email marketing sequences using a flowchart interface built with the React Flow library. The backend utilizes Agenda for scheduling emails and Nodemailer for sending emails.

Features
Visual Flowchart: Users can add and remove nodes to design email marketing sequences with Cold Emails, Wait/Delay, and Lead Source nodes.
Email Scheduling: Emails are scheduled based on the time of saving and the "Wait/Delay" nodes.
Email Sending: Emails are sent using Nodemailer after the specified time delay.
Backend API: A [POST] API is created to handle email scheduling with details like email body, subject, and recipient email address.
Tech Stack
Frontend: React, React Flow
Backend: Node.js, Express.js, Agenda, Nodemailer
Database: MongoDB
Other Libraries: React Flow (for flowchart interface), Agenda (for scheduling), Nodemailer (for sending emails)
Setup
Prerequisites
Before running the application, make sure you have the following installed:

Node.js (v14 or later)
MongoDB (local or a cloud instance like MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/email-marketing-sequence-builder.git
cd email-marketing-sequence-builder
Install frontend dependencies:

bash
Copy code
cd client
npm install
Install backend dependencies:

bash
Copy code
cd ../server
npm install
Set up environment variables:

Create a .env file in the server folder and add the following variables:
makefile
Copy code
MONGO_URI=your_mongodb_connection_string
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
AGENDA_DB=mongodb://localhost:27017/agenda
Running the Application
Start the backend server:

bash
Copy code
cd server
npm start
Start the frontend client:

bash
Copy code
cd client
npm start
The application will now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

Features Implementation
Flowchart Interface (Frontend): The React Flow library is used to create the flowchart interface where users can add and remove nodes such as "Cold Email", "Wait/Delay", and "Lead Source". The sequence is saved with timestamps for scheduling email sends.

Email Scheduling (Backend): The Agenda library is used to schedule emails based on the "Wait/Delay" node timestamps. A [POST] API is created where the request body contains the email subject, body, recipient, and the time for scheduling.

Email Sending (Backend): Emails are sent using Nodemailer. Once the scheduled time is reached, the email is sent to the recipient via SMTP.

#Bonus Features:
Authentication: The application includes authentication for user login and access to the email sequence builder. (Optional: JWT authentication can be implemented).

Unit Tests: Unit tests are written to test the backend API and the flowchart logic.

Documentation: The project includes setup documentation and code comments to make the application easy to understand and extend.


#Evaluation Criteria:
  1. Functionality: The app fulfills all the required features.
  2. Code Quality: The code is clean, modular, and well-documented.
  3. User Experience: The flowchart interface is intuitive and user-friendly.
  4. Scalability: The app’s architecture and database schema are scalable.
  5. Creativity: Innovative solutions and features were added to improve the app.
