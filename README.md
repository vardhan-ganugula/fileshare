# FileShare

The FileShare App is a fast and secure file-sharing platform that allows users to upload files up to 25 MB. Once a file is uploaded, a unique 4-digit code is generated, enabling anyone with the code to download the file from anywhere. The file remains available for up to 4 hours, and users can adjust the expiration time to fit their needs. Whether you're sending important documents or media files, FileShare makes it easy to share without the hassle of complex processes.

## Table of Contents

- [Technologies](#technologies)
- [How to Use](#how-to-use)
- [Configuration](#configuration)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Packages Used](#packages-used)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [Run the Application](#run-the-application)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **React.js**: For building the user interface.
- **Node.js**: For server-side logic.
- **Tailwind CSS**: For styling the application.

## How to Use

Clone the repository using the following command:

```bash
git clone https://github.com/vardhan-ganugula/fileshare.git
```

Navigate to both the frontend and backend directories and install the required packages:

```
cd fileshare/frontend
npm install
cd ../backend
npm install

```

## Configuration 

Before running the application, make sure you have set up the .env file correctly.


### Frontend 
Add the backend url 

``` 
VITE_BACKEND_URL=http://localhost:8000/
```
### Backend 

Add the MongoDB URI string, port number, and expiry time in milliseconds:
``` 
MONGO_URI=mongouristring
PORT=8000
EXPIRY_TIME=14400000 #4hours
```

## Packages Used 

### Frontend 

* React Icons: For using icons in the application.
* React Toastify: For displaying toast notifications.
* Axios: For making HTTP requests.

### Backend

* Nodemon: For automatically restarting the server during development
* Mongoose: For MongoDB object modeling.
* Cors: For enabling Cross-Origin Resource Sharing.
* Multer: For handling file uploads.
* Path: For working with file and directory paths.
 
* Dotenv: For loading environment variables from a .env file.

* Express: For building the server.


### Run the application 

To start the application, follow these steps:

1. Navigate to the backend directory and run the following command to start the backend server:

```
npm start 
``` 

2. Navigate to the frontend directory:
```
cd frontend
```
* For build and deployment:
```
npm run build
```
For development:

```
npm run dev
```