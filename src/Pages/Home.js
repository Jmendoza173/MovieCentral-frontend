import React, {useState, useEffect} from 'react';
import MovieNowContainer from '../Components/MovieNowContainer';

const Home = (props) => {
  const [listEmpty, setListEmpty] = useState(true);
  const [listPage, setListPage] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users/"+localStorage.loggedInUserId,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.token
      }
    }).then(r=>r.json())
    .then(userObj => userObj.lists.length > 0 ? setListEmpty(false) : null)
  }, []);


  
  const handleAddToList = () => {
    console.log("click")
  }
  return <div>
      <MovieNowContainer toList={handleAddToList}/>
    </div>
};

export default Home
