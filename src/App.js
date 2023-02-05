import "./styles.css";
import { useState, useEffect } from "react";
//import axios from "axios";
export default function App() {
  const API = "https://jsonplaceholder.typicode.com/posts";
  const getData = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((err) => console.log(err));
    // axios.get(API).then((res) => setPosts(res.data));
  };
  const [posts, setPosts] = useState([]);
  const [singlePosts, setSinglePosts] = useState({});
  const [postCollection, setPostCollection] = useState([]);
  useEffect(() => {
    getData();
    getPostBasedData();
  }, []);
  let idd = 3;
  const getPostBasedData = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idd}`)
      .then((res) => res.json())
      .then((res) => setPostCollection(res))
      .catch((err) => console.log(err));
  };
  console.log(postCollection);
  // console.log(posts);
  let newArr =
    posts &&
    posts.length > 0 &&
    posts
      .map((item) => item.userId)
      .filter((ite, i, self) => self.indexOf(ite) === i);
  //console.log(newArr);
  const getDataBasedOnUserId = (id) => {
    // console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((res) => setSinglePosts(res));
  };
  //console.log(singlePosts);
  // console.log(Object.keys(singlePosts).length+"djdhsjhd");
  return (
    <>
      {newArr &&
        newArr.length > 0 &&
        newArr.map((item, i) => (
          <span
            className="helo"
            key={i}
            onClick={() => getDataBasedOnUserId(item)}
          >
            {item}
          </span>
        ))}
      {singlePosts && Object.keys(singlePosts).length !== 0 && (
        <div className="centerDiv">
          <h4>userID-{singlePosts.userId}</h4>
          <h4>id-{singlePosts.id}</h4>
          <h4>title-{singlePosts.title}</h4>
          <h4>body-{singlePosts.body}</h4>
        </div>
      )}
    </>
  );
}
