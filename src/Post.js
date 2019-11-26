import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default class Post extends React.Component {

  _isMountedC = false;
  _isMountedP = false;

  constructor(props) {
    super(props);

    this.state = {
      postAtual: [],
      comentarios: []
    };
  }

  componentDidMount() {

    this._isMountedC = true;
    this._isMountedP = true;
    const postID = this.props.match.params.id;

    axios.get('https://iptgram.azurewebsites.net/api/posts/' + postID + "/comments")
      .then((resposta) => {
        if (this._isMountedC) {
          const comentarios = resposta.data;
          this.setState({ comentarios });
        }
      });

    axios.get('https://iptgram.azurewebsites.net/api/posts/' + postID)
      .then((resposta) => {
        if (this._isMountedP) {
          const postAtual = resposta.data;
          this.setState({ postAtual });
        }
      });
  }

  componentWillUnmount() {
    this._isMountedP = false;
    this._isMountedC = false;
  }

  render() {

    if (!this._isMountedP || !this._isMountedC) {
      return <div>Loading</div>;
    } else {
      var helper = this.state.comentarios.map(comment => (
        <div className="PostContainer">
          <span>{comment.user.name + ": "} {comment.text} </span>
          <span>{splitString(comment.postedAt)}</span>
        </div>
      ));

      return (
        <div>
          <div className="Conteudo">
            <span>
              <p className="SinglePost">{"Taken: " + splitString(this.state.postAtual.postedAt)}</p>
              <p className="SinglePost">{this.state.postAtual.likes + " people like this!"}</p>
              <p className="SinglePost"><font face="verdana">{this.state.postAtual.caption}</font></p>
              <p className="SinglePost">{"Taken by: " + this.state.postAtual.user.name}</p>
            </span>
            <img src={"https://iptgram.azurewebsites.net/api/posts/" + this.state.postAtual.id + "/image"}></img>
          </div>

          <div>
            {helper}
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