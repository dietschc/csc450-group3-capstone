// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - App.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// TJI, 13 Feb 2022, Added pb-5 to stop sticky footer covering low content
//  (DAB, 3/05/2022, Added in search for restaurantName param)

// Using React library in order to build components 
// for the app and importing needed components
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/views/Main';
import Whoops404 from './components/views/Whoops404';
import Restaurant from './components/views/Restaurant';
import Chat from './components/views/Chat';
import EditAccount from './components/views/EditAccount';
import EditRestaurant from './components/views/EditRestaurant';
import Login from './components/views/Login';
import Review from './components/views/Review';
import Search from './components/views/Search';
import UserDashboard from './components/views/UserDashboard';
import Admin from './components/views/Admin';
import { connect } from "react-redux";

function App(props) {
  // Authentication testing DEBUG*********
  // const { users } = props;
  // const [ user=[] ] = users
  return (
    <div className="App pb-5">
      <Routes>
        <Route exact path='/' element={<Main/>} />
        <Route path='/restaurant' element={<Restaurant/>} />
        <Route path='/restaurant/:restaurantId' element={<Restaurant/>} />
        <Route path='/restaurant/:restaurantId/:authorId' element={<Restaurant/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/chat/:id' element={<Chat/>} />
        <Route path='/editAccount' element={<EditAccount/>} />
        <Route path='/editRestaurant' element={<EditRestaurant/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/review' element={<Review/>} />
        <Route path='/review/:id' element={<Review/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/search/:restaurantName' element={<Search/>} />
        <Route path='/search/:restaurantId/:authorId' element={<Search/>} />
        <Route path='/userDashboard' element={<UserDashboard/>} />
        <Route path='/userDashboard/:userId' element={<UserDashboard/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path="*" element={<Whoops404/>} />
      </Routes>
    </div>
  );
}


// Mapping the redux store states to props
const mapStateToProps = (state) => ({
  // users: [...state.users]
});

// Exporting the component
export default connect(mapStateToProps, null)(App);
