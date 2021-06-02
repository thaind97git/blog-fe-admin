import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  return (
    <div className="row">
      <Button type="primary" onClick={() => history.push('/todo-list')}>
        Go to todo-list
      </Button>
      <Button type="dashed">Click</Button>
    </div>
  );
};

export default Home;
