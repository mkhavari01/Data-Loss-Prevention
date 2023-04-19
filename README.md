# How To Run Project
 
1. git clone https://github.com/mkhavari01/task-cloud.git

2. cd task-cloud

<h4>if you have Docker</h4>
3. docker-compose up  

<h4>if you don't have Docker</h4>
3. cd server uncommnet code line 2 in .env file <br/>
4. npm run start<br/>
5. cd client<br/>
6. npm start

# Technical  Documentation

<h2>Overview</h2>
<p>The project is a web application that simulates a user filling out a form. The application has two inputs, and every user has a session that distinguishes them from each other. The session is saved in cookies so that data is not lost when the user reloads the webpage or closes the tab.</p>

<h2>Architecture</h2>
<p>The project is built using a client-server architecture. The client-side of the application is developed using Javascript framework<strong>( Reactjs )</strong> . The server-side of the application is built using<strong> Node.js</strong>, Express framework, and <strong>MongoDB</strong>.</p>

<h2>Client-Side</h2>
<p>The client-side of the application contains two input fields where users can input data. When a user inputs data into these fields, the data is sent to the server to be saved in the database. If a user leaves the webpage or closes the tab, their session is saved in cookies, so they can continue where they left off when they return.</p>

<h2>Server-Side</h2>
<p>The server-side of the application is responsible for managing user sessions, storing form data, and serving data to the client-side.</p>

<h2>User Session Management</h2>
<p>When a user visits the website, the server checks their cookies to see if they have a session or not. If they do, the form data is fetched from the server, and the user can continue filling out the form. If they do not have a session, one is generated, and the session data is saved in cookies.</p>

<h2>Changing Saving Methods</h2>
<p>The project also includes a page where users can see all sessions and retrieved data and update it. At the top of the page, there is a button that allows users to change the method of saving data to the database.</p>

<h2>Deployment</h2>
<p>The project can be deployed using Docker and Docker Compose. The Docker Compose file includes three services: frontend, backend, and mongo. The frontend service builds the client-side of the application, and the backend service builds the server-side of the application. The mongo service is responsible for running the MongoDB database.</p>

<h2>Preventing Data Loss Methods</h2>
<p>When users fill out a form on a website, it is important to prevent data loss in case the user navigates away or the browser crashes. Here are five methods that were explored to prevent data loss in this project:</p>
<h4>Method 1: Web Socket Connection</h4>
<p>A web socket connection was used to send data to the server every time the user typed a character. This ensured that data was saved in real-time and was always up-to-date. However, this method can be resource-intensive, especially when there are many users, and may cause performance issues on the server.</p>
<h4>Method 2: HTTP Request on Each User Typing</h4>
<p>An HTTP request was sent to the server every time the user typed a character. This ensured that data was saved on the server and was always up-to-date. However, this method can also be resource-intensive, especially when there are many users, and may cause performance issues on the server.</p>
<h4>Method 3: Periodic HTTP Requests</h4>
<p>An HTTP request was sent to the server every 2.5 seconds to save the user's form data. This ensured that data was saved periodically and was not lost if the user navigated away or the browser crashed. However, this method can be less accurate and may result in data loss if the user leaves the page before the data is saved.</p>
<h4>Method 4: HTTP Request on More Than 5 Characters Typed</h4>
<p>An HTTP request was sent to the server every time the user typed more than 5 characters in an input field. This ensured that data was saved on the server and was always up-to-date, while reducing the number of requests made to the server. However, this method may result in data loss if the user navigates away or the browser crashes before the data is saved.</p>
<h4>Method 5: Debounce Method</h4>
<p>The best method that was found was to use the debounce method. This method waits for the user to stop typing for 500ms and then sends an HTTP request to save the data on the server. This ensures that data is saved on the server and is always up-to-date, while significantly reducing the number of requests made to the server.</p>
<h4>Advantages and Disadvantages</h4>
<p>Each of these methods has its own advantages and disadvantages. The WebSocket Connection and HTTP Request on Each User Typing methods ensure that data is always up-to-date but can be resource-intensive and cause performance issues on the server. The Periodic HTTP Requests method ensures that data is saved periodically but can be less accurate and may result in data loss. The HTTP Request on More Than 5 Characters Typed method reduces the number of requests made to the server but may result in data loss if the user navigates away or the browser crashes before the data is saved. The Debounce Method ensures that data is always up-to-date while significantly reducing the number of requests made to the server.</p>

Overall, this project demonstrates the importance of preventing data loss and utilizing effective methods to achieve this goal. The debounce method proved to be the best method for this particular scenario, but it's important to choose the most suitable method based on the project's requirements and limitations.

