# Task Management App Documentation

## Overview

The Task Management App provides a user-friendly interface for managing tasks, viewing task history, and performing actions such as creating, updating, and deleting tasks. It allows users to interact with tasks, view task history, and track changes made to tasks over time.

### Libraries Used

1. **react-hot-toast**: 
   - Used for displaying toast notifications to provide feedback during operations like fetching data, success, error, and loading states.
   - Example use: `toast.promise()` for handling asynchronous tasks with user notifications.

2. **react-icons**: 
   - Provides a collection of customizable icons that can be used across the app.
   - Example use: Icons are utilized in various components to enhance UI/UX.

3. **react-color**:
   - A color picker library that allows users to choose colors for tasks or other customizable features.
   - Example use: Allowing users to pick colors for task priority, labels, or background settings.

## Features

- **Task Management**: Create, update, delete, and view tasks.
- **Task History**: View detailed history of task actions like creation, updates, and deletions.
- **Color Customization**: Use the color picker to customize task appearance or labels.
- **Toast Notifications**: Real-time notifications to notify the user about success or failure of task-related actions (e.g., task creation, update, or deletion).
- **Responsive UI**: The app is responsive and works well across different screen sizes.

## Libraries Overview

### react-hot-toast

- **Purpose**: This library provides a simple and customizable way to display toast notifications in the app. It’s used to notify users about the status of asynchronous actions like API calls or task updates.
  
- **Usage**:
  - Wrap API calls with `toast.promise()` to provide feedback during data fetching and completion:
    ```ts
    toast.promise(
      axios.get("/tasks"),
      {
        loading: "Fetching tasks...",
        success: "Tasks fetched successfully!",
        error: "Failed to fetch tasks."
      }
    );
    ```

### react-icons

- **Purpose**: `react-icons` offers a set of customizable icons, making it easy to integrate visual elements into your UI.

- **Usage**: Icons are used for various actions such as task creation, task updates, and general navigation. Example:
  ```tsx
  import { FaTrashAlt } from "react-icons/fa";
  
  const Task = () => (
    <div>
      <button>
        <FaTrashAlt /> Delete Task
      </button>
    </div>
  );




# `Board` Component

## Overview

The `Board` component is responsible for rendering a task list in a kanban-style board. It displays a list of tasks within a column (known as a "list") and allows the user to create new tasks. The component is built using React and integrates with the `react-beautiful-dnd` library to enable drag-and-drop functionality.

## Props

### `list` (Required)

- **Type**: `object`
- **Description**: The list object that contains the title and tasks to be displayed in the board.
  - `id` (string): The unique identifier for the list.
  - `title` (string): The title of the list (e.g., "To Do", "In Progress").
  - `tasks` (array): An array of task objects to be displayed in the list.

# `List` Component

## Overview

The `List` component is used to represent an individual task card within a kanban-style board. It displays task details such as the title, description, and tag, and provides functionality to delete the task. The component is draggable, allowing it to be repositioned within the task list using the `react-beautiful-dnd` library.

## Props

### `task` (Required)

- **Type**: `Task`
- **Description**: The task object containing details about the task.
  - `id` (number): The unique identifier for the task.
  - `title` (string): The title of the task.
  - `description` (string): A brief description of the task.
  - `tag` (string): The tag associated with the task (e.g., "Urgent", "Low Priority").
  - `column_id` (string): The ID of the column this task belongs to.
  - `position` (number): The position of the task in the list.
  - `tag_bg` (string): The background color of the task tag.
  - `tag_color` (string): The color of the task tag text.

### `index` (Required)

- **Type**: `number`
- **Description**: The index of the task in the list, used for drag-and-drop functionality.

## Features

### Drag-and-Drop

The `List` component uses `react-beautiful-dnd`'s `Draggable` component to make the task card draggable. This allows tasks to be reordered within the list.

### Task Deletion

- The `List` component provides a delete icon (`IoTrashBinSharp` from `react-icons`).
- When the delete icon is clicked, it triggers a request to delete the task from the backend API.
- A loading state is displayed while the task is being deleted, and the user is notified with a toast message upon success or failure.

### Toast Notifications

- The `react-hot-toast` library is used to display toast notifications indicating the task deletion status (loading, success, error).

### Modal for Task Management

- The component uses the `useModal` custom hook to update the global state and trigger re-fetching of tasks when a task is deleted.

## Methods

### `handleDelete`

- This function is triggered when the user clicks the delete icon.
- It sends a DELETE request to the API to remove the task.
- The task deletion is followed by a toast notification to inform the user about the success or failure of the operation.
- After deletion, the `setCallAPI(true)` function is called to trigger an update (e.g., re-fetching the task list).

# `NewTask` Component

## Overview

The `NewTask` component is used to create a new task within a specific board column. It allows the user to enter a task's title, description, and tag, and customize the background and font color of the task's tag. The component uses a modal to collect the task's details and then sends the data to the backend to add the task.

## Props

This component doesn't accept any props directly, but it uses the `useModal` custom hook to manage the modal state (`isModalOpen`, `closeModal`) and trigger API calls.

## State

### `task` (State)

- **Type**: `TaskInput`
- **Description**: Holds the input values for the new task.
  - `title` (string): The title of the task.
  - `description` (string): The description of the task.
  - `tag` (string): The selected tag for the task (e.g., "shopping", "exam").
  - `column_id` (string): The ID of the column where the task will be added. It's dynamically set based on the title of the column.
  - `position` (number): The position of the task in the column (initially set to 0).
  - `tag_bg` (string): The background color of the task's tag.
  - `tag_color` (string): The font color of the task's tag.

### `color` and `bgColor` (State)

- **Type**: `string`
- **Description**: These states hold the color values for the task's tag font (`color`) and background (`bgColor`).

## Methods

### `handleChange`

- **Description**: Handles changes in input fields (title, description, and tag). It updates the state of the `task` based on the name and value of the input fields.

### `handleSubmit`

- **Description**: Handles the form submission. It sends a `POST` request to the backend API to create a new task with the data from the form.
- **Toast Notifications**: The submission process is wrapped in a toast notification to show loading, success, or error messages to the user.
- **API Call**: The request is made to `POST /tasks`, and upon successful creation, the `setCallAPI(true)` function is called to trigger the update for fetching the updated task list.

### `handleColorChange` and `handleBgColorChange`

- **Description**: These functions handle changes in the color pickers for the task's tag font and background colors. They update the corresponding state and update the task object to reflect the new colors.

## UI Elements

### Modal

The form is displayed in a modal, which is controlled via the `useModal` context hook:

- `isModalOpen`: Determines if the modal is visible or not.
- `closeModal`: Closes the modal when triggered (e.g., clicking the close icon).

### Input Fields

- **Title**: An input field for the task's title.
- **Description**: A textarea for the task's description.
- **Tag**: A dropdown to select a tag for the task (e.g., "shopping", "exam").
- **Color Pickers**: Two color pickers using `SketchPicker` from `react-color` to choose the background and font color for the task's tag.

### Close Button

- An icon (`IoCloseCircle`) is provided to close the modal.

### Submit Button

- A button at the bottom of the form submits the task data.

# `Tasks` Component

## Overview

The `Tasks` component manages the task lists and handles drag-and-drop functionality using the `react-beautiful-dnd` library. It fetches tasks from the backend, organizes them into different columns (e.g., "Backlog", "To Do", "Done"), and allows tasks to be reordered via drag-and-drop. The component uses the `useModal` hook to manage API calls.

## Props

This component doesn't accept any props directly, but it uses the `useModal` custom hook to manage the modal state (`callAPI`, `setCallAPI`).

## State

### `data` (State)

- **Type**: `BoardData`
- **Description**: Holds the lists and their corresponding tasks.
  - `lists` (Record<string, List>): An object with columns (lists) as keys and their tasks as values. Each column contains a list of tasks.
  - `listOrder` (string[]): An array representing the order of the columns in the UI (e.g., ["backlog", "todo", "done"]).

### `callAPI` and `setCallAPI` (State from `useModal`)

- **Type**: `boolean` and `function`
- **Description**: The `callAPI` state determines whether to refetch the tasks when a change occurs (like a task being moved between columns). The `setCallAPI` function is used to trigger a re-fetch.

## Methods

### `onDragEnd`

- **Description**: Handles the drag-and-drop functionality when a task is moved between columns.
  - **Parameters**: `result` (DropResult) — The result from the drag-and-drop operation, including the source and destination columns, task ID, and task position.
  - **Steps**:
    1. Retrieves the task that was dragged.
    2. Moves the task from its original position to its new position in the destination list.
    3. Sends a `PUT` request to update the task's `column_id` and `position` in the backend.

### `useEffect` (Fetching Task Data)

- **Description**: When the component mounts or when `callAPI` changes, the component fetches tasks from the backend.
  - The fetched tasks are categorized into three columns: "Backlog", "To Do", and "Done". Tasks are grouped based on their `column_id`, and each column is sorted by the `position` of the task.
  - The fetched data is stored in the `data` state, which holds the tasks and the column order.

## UI Elements

### Drag-and-Drop

The component uses `DragDropContext` from `react-beautiful-dnd` to allow users to drag tasks between columns. The `onDragEnd` callback is passed to `DragDropContext` to handle the reordering of tasks when they are dropped into a new column.

### Board Component

The tasks are displayed inside different boards (columns), which are rendered by the `Board` component. Each column has a set of tasks that are dragged and dropped.

### Lists (Columns)

The tasks are categorized into three columns:

- **Backlog**: Tasks that are yet to be worked on.
- **To Do**: Tasks that are ready to be worked on.
- **Done**: Tasks that have been completed.

# `ModalContext` and `useModal` Hook

## Overview

The `ModalContext` provides a context to manage modal visibility, title, and API call state across your application. It includes a provider (`ModalProvider`) that wraps around your components and a custom hook (`useModal`) to access the modal's state and functions.

## Components

### `ModalProvider`

- **Purpose**: This component provides the `ModalContext` to the rest of your application, making modal state and functionality accessible to child components.
- **Props**:
  - `children`: The components that will consume the modal context.
- **State**:
  - `isModalOpen`: A boolean representing whether the modal is currently open.
  - `title`: The title to be displayed in the modal.
  - `callAPI`: A boolean that determines whether an API call should be triggered.
- **Methods**:
  - `openModal`: A function to open the modal by setting `isModalOpen` to `true`.
  - `closeModal`: A function to close the modal by setting `isModalOpen` to `false`.
  - `setTitle`: A function to set the modal's title.
  - `setCallAPI`: A function to set the value of `callAPI`, which can be used to trigger API calls.

### `useModal` Hook

- **Purpose**: This custom hook provides access to the `ModalContext`. It allows any component inside the `ModalProvider` to read and update the modal state.
- **Returns**: The hook returns an object containing the following properties:
  - `isModalOpen`: A boolean indicating if the modal is open.
  - `openModal`: A function to open the modal.
  - `closeModal`: A function to close the modal.
  - `title`: The title of the modal.
  - `setTitle`: A function to set the title of the modal.
  - `callAPI`: A boolean indicating whether an API call should be triggered.
  - `setCallAPI`: A function to set the value of `callAPI`.

## Example Usage

### Wrapping the Application with `ModalProvider`

To make the modal context available to your components, wrap the root component with the `ModalProvider`.

# `TaskHistory` Component

## Overview

The `TaskHistory` component is responsible for displaying the task history of actions performed on tasks, such as creation, updates, and deletions. The history is fetched from the server and displayed in a grouped format based on the date the action was performed.

This component leverages the `react-hot-toast` library to show loading and success/error toast notifications while fetching the task history from the API.

## Structure

### 1. Fetching Task History

- **API Call**: The `fetchTaskHistory` function sends a `GET` request to fetch task history data from the API endpoint defined by `VITE_API_URL`.
- **Toast Notifications**: The API request is wrapped with `toast.promise` to provide feedback during the loading, success, and error stages of fetching the data.
- **State Management**:
  - `history`: Stores the fetched task history items.
  - `loading`: Tracks whether the history is still being loaded.

### 2. Formatting the Date

- **`formatDate` Function**: This function formats the task's `created_at` timestamp into a human-readable format:
  - **Today**: If the task was created today.
  - **Yesterday**: If the task was created yesterday.
  - **Date String**: Otherwise, it formats the date into a localized string.

### 3. Grouping the History by Date

- **`groupByDate` Function**: This function groups the task history by date, using the formatted date string as the key for each group. It returns an object where the keys are dates (e.g., "Today", "Yesterday") and the values are arrays of task history items.

### 4. Rendering Task History

- **Grouped History**: The grouped task history is iterated over, and for each date, a list of task history items is displayed.
- **Displaying Task Actions**: Each history item is displayed with details about the action performed (`created`, `updated`, `deleted`):
  - **Created**: Displays when a task was created in a particular column.
  - **Updated**: Displays when a task was moved to a different column or position.
  - **Deleted**: Displays when a task was deleted from a column.
- **Styling**: The action is color-coded:
  - **Green** for created tasks.
  - **Blue** for updated tasks.
  - **Red** for deleted tasks.

### 5. Loading and Empty States

- **Loading State**: Displays a loading message while the task history is being fetched.
- **Empty State**: Displays a message when no task history is available.
