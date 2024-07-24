# Integration Engineer Test

We appreciate your interest in the Integration Engineer role at our company. This test helps us understand your skills in creating a Node.js backend API and a ReactJS frontend. You should finish the test within a few hours. Please read the instructions carefully.

## Task Overview:

Your task is to build a simple task management application. This template offers a basic setup for a React frontend using Vite, which connects to a Node/Express backend. Users should be able to view, create, update, and delete tasks.

There are different parts to this exercise:

1. Set up the backend and frontend, resolving any issues that may arise (some issues might not have been noticed by the original developer since 'it works locally').
2. Complete the endpoints for task creation and deletion.
3. Implement missing functions in the React frontend to interact with the new endpoints for task creation and deletion.
4. Develop a new endpoint in the Express app for updating tasks. Create a UI allowing users to update tasks and communicate with this new endpoint.
5. Update the CSS to improve the usability of the solution.

_Additional Information_

- Tasks should be stored temporarily in memory; permanent storage is not necessary.
- Prevent creating or updating tasks with empty titles or descriptions. Display an error if users attempt to submit an invalid task. (Your backend should handle this check and return an error.)
- No guidance is available from the previous developer on setting up the project on a new machine. You'll need to use the existing files to figure it out, considering possible mistakes.
- The backend is in JavaScript, while the frontend React code is in a .tsx file. Make sure your work is valid TypeScript.
- Enable CORS support in the API to permit cross-origin requests.
- The app's rudimentary styling by the previous developer can be improved for better user experience.
- BONUS: If you can optimize the React app's rendering for efficiency, feel free to make changes.

_Submission Guidelines_

- Fork this GitHub repository to your own GitHub account.
- Develop the backend and frontend using the provided directory structure.
- Edit this README below to explain how to run both the backend and frontend.
- Once done, share the link to your forked repository via email.

_Evaluation Criteria_

- Functionality: Does the app meet the requirements and work error-free?
- Code Quality: Is the code well-structured, modular, and easy to understand?
- API Design: Did you design the API in a RESTful way? Is error handling and validation effective?
- Frontend Design: Is the frontend user-friendly, responsive, and visually appealing?
- Git Usage: Are your commits meaningful and code changes well-tracked?
- Documentation: Are instructions provided for setting up the app on a new machine?

Use this opportunity to showcase your skills. If you see fit, add extra features or improvements.

Please note that this test aims to be completed in a few hours. However, quality work is more important than speed. If you have questions, feel free to email us.
gur submission!

Regards,
The Duda Solutions Engineering Team

## Add any instructions to get your submission running below this line.

# Frontend

## How to run the frontend

1. Get into the frontend directory
   - To get into the frontend directory just run the following command
     `cd frontend`
     <br>
2. Install dependencies
   - To install the dependencies just run the following command in the frontend directory
     `yarn`
     <br>
3. Run the frontend
   - To run the frontend just run the following command in the frontend directory
     `yarn dev`

# Backend

## How to run the backend

1. Get into the backend directory
   - To get into the backend directory just run the following command
     `cd backend`
     <br>
2. Install dependencies
   - To install the dependencies just run the following command in the backend directory
     `yarn`
     <br>
3. Run the backend
   - To run the backend just run the following command in the backend directory
     `yarn dev`

## API Reference

### Status

```http
  GET /
```

Return example:

```
 Hello, world!
```

<br>

### Get all tasks

```http
  GET /tasks
```

Return example:

```json
[
  {
    "title": "title 1",
    "description": "description 1",
    "done": false,
    "id": "66a15222491392a6b30558da"
  },
  {
    "title": "title 1",
    "description": "description 2",
    "id": "66a14fff491392a6b30558d9"
  }
]
```

<br>

### Create a task

```http
  POST /tasks
```

Body:
| Parameter | Type | Description |
| :------------ | :-------- | :---------------------------------------- |
| `title` | `string` | **Required**. The title of the task |
| `description` | `string` | **Required**. The description of the task |
| `done` | `boolean` | The status of the task |

Return example:

```json
{
  "title": "title",
  "description": "description",
  "id": "66a15e0511c1892dc9c62161"
}
```

<br>

### Get task by id

```http
  GET /tasks/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. The id of the task |

Return example:

```json
{
  "title": "title",
  "description": "description",
  "done": false,
  "id": "66a15e0511c1892dc9c62161"
}
```

<br>

### Update a task

```http
  PUT /tasks/:id
```

Body:

| Parameter     | Type      | Description                               |
| :------------ | :-------- | :---------------------------------------- |
| `title`       | `string`  | **Required**. The title of the task       |
| `description` | `string`  | **Required**. The description of the task |
| `done`        | `boolean` | The status of the task                    |

Return example:

```json
{
  "title": "edit title",
  "description": "description",
  "done": true,
  "id": "66a15e0511c1892dc9c62161"
}
```

<br>

### Delete a task

```http
  DELETE /tasks/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Required**. The id of the task |

Return example:

```json
{
  "message": "Task with id 66a15e0511c1892dc9c62161 has been deleted successfully"
}
```
