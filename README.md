About
---
This is an assignment project that features a videos portal where users can watch and rate videos after logging in. The backend API is provided and the task is to implement the front-end of the app.



Setup
---
1. install dependencies: npm install
2. compile and build: npm run build
3. make sure mongodb is running
4. start development server: npm start
5. open http://localhost:3000/ in your browser and the app should work
6. run tests: npm run test



Overview
---
For building this app i went with a react-redux framework. I have 3 main pages: login, video listings and video details pages. 

User authentication is done on the client side only, the provided API handles server side authentication, so basically there is no locally saved sessions (if you refresh you will be unauthorised).

In my action creators i use the redux thunk library to communicate with the api and fetch async data, data are passed to reducers which updates the state, state updates are reflected in the UI components by using componentWillReceiveProps method, basically i use it to listen to the state and props updates, i need to do this because i'm fetching data asynchronously with thunks so when the component is first rendered it needs a way to listen to state changes and thats how i do that.

I don't use the getSingleVideo api request in my app because i opted to manipulate the single video pages (details pages) using the videos i already have fetched for listings and are stored in the store, thus, reducing the need for more api calls.

Code is pretty straightforward and inline comments are provided where necessary, i used some helper libraries like md5 to encode the password, react-rating for the rating component and react-infinite-scroll-component for the infinite scrolling listings.



Tests
---
Having had ran out of time to submit this project i have added the tests for reducers but did not manage to write up the actions and components tests yet, i will be working on them and completing them for this project anyway but please do let me know if you would accept it if i send them to you in the coming days.
