import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import UserIcon from "../public/user.png";

export default class Posts extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      listaPost: []
    };
  }

  componentDidMount() {

    this._isMounted = true;

    axios
      .get(`https://iptgram.azurewebsites.net/api/posts`)
      .then(resposta => {
        if (this._isMounted) {
          const listaPost = resposta.data;
          this.setState({ listaPost });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    if (!this._isMounted) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <div>
            {this.state.listaPost.map(post => {
              return (
                <div >
                  <Link to={"/Post/" + post.id}>

                    <div className="PostContainer">
                      <div className="Conteudo">
                        <img className="userIMG" src={UserIcon}></img>
                        <div>
                          <p>{"Who: " + post.user.name}</p>
                          <p>{"When: " + splitString(post.postedAt)}</p>
                          <p>{"Likes: " + post.likes}</p>
                          <p>{"Comments: " + post.comments}</p>
                        </div>
                      </div>
                      <img src={"https://iptgram.azurewebsites.net/api/posts/" + post.id + "/image"}></img>

                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

//Tratar a data para apresentar apenas dia/mes/ano
function splitString(stringToSplit) {

  var date = new Date(stringToSplit);
  var arrayOfStrings = date.toString().split(' ');
  var treated = arrayOfStrings[2] + '-' + arrayOfStrings[1] + '-' + arrayOfStrings[3];

  return treated;
}

