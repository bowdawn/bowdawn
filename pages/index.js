import { Component } from 'react';
import { Button } from 'antd';


import firebase from "../firebase"



export default class Welcome extends Component {
  render() {
    firebase.firestore().collection("people").add({ id: 1, name: "bowdawn" });
    return (<div>
      <div>Hello World</div>
      <Button type="primary">Hello World</Button>
    </div>);
  }
}
