import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

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
        <div>
          {comment.text}
          {comment.user.name}
          {comment.postedAt}
        </div>
      ));

      return (
        <div>
          {this.state.postAtual.postedAt}
          {this.state.postAtual.likes}
          {this.state.postAtual.caption}
          {this.state.postAtual.user.name}
          <img src={"https://iptgram.azurewebsites.net/api/posts/" + this.state.postAtual.id + "/image"}></img>
          <div>
            {helper}
          </div>
        </div>
      );
    }
  }
}
