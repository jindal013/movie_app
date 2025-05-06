import { useState, useEffect } from "react";

const Card = ({ title }) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect( () => {
    console.log(`${title} has been liked: ${hasLiked}`)
  }, [hasLiked]);

  useEffect(() => {
    console.log('card rendered!');
  });

  return (
    <div className="card" onClick={ () => setCount(c => c + 1)}>
      <h2>{title} <br/> {count || null }</h2>

      <button onClick={ () => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

const title = "react";

const App = () => {


  return (
    <div className="card-container">
      <Card title="Star Wars" rating={5} isCool={true}/>
      <Card title="Lion King" />
      <Card title="Avatar" />
    </div>
  );
};

export default App;
