import { Component } from 'react';
import { Button } from 'antd';
import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  console.log(res);
  return res.json();
};

export default class Welcome extends Component {
  render() {
    return (<div>
      <div>
        Hello Vercel Firebase! updated react / react-dom, import firebase adming and swr
      </div>
      <Button type="primary" >bowdawn</Button>
    </div>);
  }
}
