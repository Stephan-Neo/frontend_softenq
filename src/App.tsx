import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'

function App() {
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('http://localhost:3000/getUsers');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  useEffect(() => {
    callBackendAPI()
    .then(res => {
      setState(res.text)
      console.log(res.text)
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <>
      <div>
          GTSK - company future
          <div>
            Users:<span></span>
            {state}
          </div>
      </div>
    </>
  )
}

export default App
