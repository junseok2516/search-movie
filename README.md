# Search Movie

## Project Description
A full-stack web application that fetches movie search results, details, and the top 3 ranked movies from the OMDb API.

## How to Install and Run
1. **Frontend**:
   - Navigate to the `search-movie` folder
   - Install the necessary node modules: `npm install`
   - Run `npm start`.
3. **Backend**:
   - In the `server` folder
   - Install the necessary node modules`npm install`
   - Run `node server.js`.
5. Open your browser and go to [http://localhost:3000](http://localhost:3001) to view the project.

## How to Use the Project
- **Left Panes**: Search for movies and view a list of up to 10 results.
- **Right Pane**: Displays the top 3 ranked movies and details of the selected movie from the list.

## Technology
- **Frontend**: React
- **Backend**: Node.js, Express
- **Tools**:
  - **Axios**: Handles communication with the OMDb API to fetch movie data and display it.
  - **CORS**: Allows the frontend to make requests to the backend server from a different origin, ensuring smooth data flow between them.

## Future Enhancements
- Display ratings for each listed movie so it shows more intuitively.
- Add fixed-size posters for a more informative view.
- Improve UI for better user experience.
- Alert when search is not found.
