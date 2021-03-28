## Sample application that shows data in table or chart

Mimics coinmarketcap.com api with help of "Mock Service Worker" library: `src/services/mock-server/index.ts` in order to avoid all the hassle of authentication and request limits


### Main component
`src/components/app/App.tsx`

Run: 
* set `REACT_APP_MOCK_SERVER=true` environment variable (already set in `.env` file for create-react-app-scripts)
* `npm start`

### Tests
`src/test`

Run: `npm test`