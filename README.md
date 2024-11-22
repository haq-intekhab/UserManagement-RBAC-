# User and Role Management Application

## Getting Started

Follow these steps to set up and run the application:

### Clone the Repository

```bash
git clone https://github.com/UserManagement-RBAC-.git
cd UserManagement-RBAC-
```

### Install the required dependencies for the React app:

Install the required dependencies for the React app

```bash
npm install
```

### Start the JSON Server

Start the JSON server for handling backend APIs

```bash
npm run server
```
The JSON server will run at: http://localhost:5000/

### Start the React Application

Run the React development server:

```bash
npm run start
```
The React app will be live at: http://localhost:3000/

### Application Details

📋 Application Flow

1. Home Page:

. A welcoming page with a Greeting.

2. Users Page:

. Displays a list of users.
. Allows operations like adding, editing, and deleting users.
. Includes sorting, searching, and pagination functionalities.

3. Roles Page:

. Displays a list of roles.
. Allows operations like adding, editing, and deleting roles.
. Users can assign permissions to roles.
. Includes pagination functionality.

### Features and Functionalities

1. Sorting

. Users can be sorted by Name, Email, or Status.
. Implemented using the sort() method.

2. Searching
   
. Search functionality filters users by Name or Email.
. Provides real-time filtering as the user types.

3. Pagination

Displays a subset of users or roles on each page.
Includes navigation buttons for "Previous" and "Next".

4. CRUD Operations

(i). Users:
. Add new users.
. Edit existing users.
. Delete users.

(ii). Roles:
. Add new roles.
. Edit existing roles.
. Assign permissions to roles.
. Delete roles.

5. Permissions Management
   
. Assign permissions like Create, Read, Update, and Delete to roles.
. Dynamically updates the role's permission list.

6. Responsive Design
. Fully responsive UI built with Tailwind CSS.
. Works seamlessly across mobile, tablet, and desktop devices.

### Pages, Components and Contexts

Pages:

1. Home Page: 
. Simple greeting and introduction to the application.

2. Users Page:
. Manages user data with all CRUD operations, sorting, searching, and pagination.

3. Roles Page:
. Manages roles, including assigning permissions and CRUD operations.

Components:

1. NavBar: Navigation between pages.
2. Modal: Reusable modal for forms.
3. UserForm: Form for adding/editing users.
4. RoleForm: Form for adding/editing roles and assigning permissions.
5. UserList: To render all the users with editing and deleting functionality.
6. RoleList: To render all the roles with editing and deleting functionality.

Contexts: 

1. UserContext: It centralized storage to store and manage state of the users data with all methods.
2. RoleContext: It centralized storage to store and manage state of the roles data with all methods.

### Technologies Used

Technology ->	Purpose
1. React.js ->	Frontend framework for building the UI.
2. JSON Server ->	Backend mock server for API handling.
3. Axios -> For making API requests.
4. CSS (Tailwind) ->	For responsive and modern UI styling.
5. React Router ->	For navigation and routing between pages.
6. react-hot-toast -> To give notification on every operation.
7. react-icons -> To improve the user-interface.

### API Endpoints
Method ->	Endpoint ->	Description
1. GET -> /users ->	Fetch all users.
2. POST ->	/users ->	Add a new user.
3. PUT ->	/users/:id ->	Update a specific user.
4. DELETE ->	/users/:id ->	Delete a specific user.
5. GET ->	/roles ->	Fetch all roles.
6. POST ->	/roles ->	Add a new role.
7. PUT ->	/roles/:id ->	Update a specific role.
8. DELETE ->	/roles/:id ->	Delete a specific role.

### Thank you for using the User and Role Management Application! 😊
