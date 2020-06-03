import { Component } from 'react';
import { Button } from 'antd';
import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

export default function Index() {



  const { data, error } = useSWR(`/api/plants/hi`, fetcher);


  if (!data) {
    return 'Loading...';
  }
  return (<div>
    <div>plants</div>
    <div>
      {JSON.stringify(data.plants)}
    </div>
    <Button type="primary" >bowdawn</Button>
  </div>);

}
