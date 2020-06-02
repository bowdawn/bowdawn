import { Component } from 'react';
import { Button } from 'antd';
import { loadFirebase } from '../lib/db.js'

export default class Welcome extends Component {

  static async getInitialProps() {
    let firebase = await loadFirebase();

    let plantsRef = firebase.collection('plants');
    let allPlants = plantsRef.get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          data.push(Object.assign({
            id: doc.id
          }, doc.data()))
        });
        return {
          plants: data
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    return allPlants;
  }

  componentDidMount = () => {
    console.log(this.props)
  }

  render() {
    const { plants } = this.props;
    return (<div>
      <div>
        Hello Firebase!
      </div>
      <Button type="primary" >bowdawn</Button>
      {plants.map(plant => <div>{plant.nameEn}</div>)}
    </div>);
  }
}
