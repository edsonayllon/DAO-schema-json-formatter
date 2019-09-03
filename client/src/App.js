import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [abi, setAbi] = useState('');
  const [out, setOut] = useState('testing');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let abiObj = JSON.parse(abi);
    let arr = [];
    abiObj.forEach(function(i) {
      let fields = []
      i.inputs.forEach(function(j) {
        let field = {
          "label": j.name,
          "name": j.name,
        }
        if (j.type === "address[]" || j.type === "address") {
          field = {
            ...field,
            "placeholder": "Address (0x0000…)"
          }
        }
        if (j.type === "bool") {
          field = {
            ...field,
            "defaultValue": 0,
          }
        }

        fields.push(field);
      });
      arr.push({
        "id": i.name,
        "label": i.name,
        "description": i.name,
        "notes": "https://github.com/Bounties-Network/StandardBounties/blob/master/contracts/StandardBounties.sol",
        "fields": fields,
        "abi": i
      });
      console.log(i)
    });
    setOut(JSON.stringify(arr));
  };

  console.log(abi)
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Enter ABI:
            <textarea type="text" cols="40" rows="5" value={abi} onChange={e => setAbi(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {
          out
        }
      </header>
    </div>
  );
}

export default App;
