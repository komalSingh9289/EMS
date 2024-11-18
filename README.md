<h1>Email Marketing Sequence Builder (MERN Stack)</h1>

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


#Evaluation Criteria:
  1. Functionality: The app fulfills all the required features.
  2. Code Quality: The code is clean, modular, and well-documented.
  3. User Experience: The flowchart interface is intuitive and user-friendly.
  4. Scalability: The app’s architecture and database schema are scalable.
  5. Creativity: Innovative solutions and features were added to improve the app.
