import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

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
                <div>
                  <Link to={"/Post/" + post.id}>
                    <li>
                      {post.user.name + " | " + post.postedAt + " | " + post.likes + " | " + post.comments}
                    </li>
                    <img src={"https://iptgram.azurewebsites.net/api/posts/" + post.id + "/image"}></img>
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



