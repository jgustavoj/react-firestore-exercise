import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import "./App.css";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("school");
  console.log(ref);

  // this function uses querySnapshot and it gives a respond in "realtime" from firestore.

  function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSchools(items);
      setLoading(false);
    });
  }

  //This is a one time get request example
  // function getSchools2() {
  //   setLoading(true);
  //   ref.get().then((item) => {
  //     const items = item.docs.map((doc) => doc.data());
  //     setSchools(items);
  //     setLoading(false);
  //   });
  // }

  useEffect(() => {
    getSchools();
    // getSchools2();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Schools</h1>
      {schools.map((school) => (
        <div key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
        </div>
      ))}
    </>
  );
}

export default App;
