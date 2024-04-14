import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, Button, Card, Image } from 'react-bootstrap';

function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({
    pairs: '',
  });

  const { pairs } = item;

  const contractAddress = '0x0Cee96D424F37EC839B5d866d7DA3980b0d7e622';

  const ABI = [
    {
      inputs: [],
      name: 'getChainLinkDataFeedLatestAnswer',
      outputs: [
        {
          internalType: 'int256',
          name: '',
          type: 'int256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
  ];

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async () => {
    const contractPrice = await contract.getChainlinkDataFeedLatestAnswer();
    setStoredPrice('$' + parseInt(contractPrice) / 100000000);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <Image
        src="https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png"
        width={200}
        height={200}
        fluid
        className="mt-5"
      />
      <hr />
      <div>
        <Card style={{ width: '32rem' }} className="mt-5 shadow bg-body rounded">
          <Card.Header as="h5">Conversion Pair</Card.Header>
          <Card.Body>
            <div className="col">
              <form onSubmit={handleSubmit}>
                <Form.Group controlId="pairs">
                  <Form.Check
                    value="BTC/USD"
                    type="radio"
                    aria-label="radio 1"
                    label="BTC/USD"
                    onChange={handleChange}
                    checked={pairs === 'BTC/USD'}
                  />
                  <Form.Check
                    value="ETH/USD"
                    type="radio"
                    aria-label="radio 2"
                    label="ETH/USD"
                    onChange={handleChange}
                    checked={pairs === 'ETH/USD'}
                  />
                  <Form.Check
                    value="LINK/USD"
                    type="radio"
                    aria-label="radio 3"
                    label="LINK/USD"
                    onChange={handleChange}
                    checked={pairs === 'LINK/USD'}
                  />
                  <Form.Check
                    value="BTC/ETH"
                    type="radio"
                    aria-label="radio 4"
                    label="BTC/ETH"
                    onChange={handleChange}
                    checked={pairs === 'BTC/ETH'}
                  />
                </Form.Group>
              </form>
              <div className="mt-5">
                <Button
                  variant="outline-primary"
                  size="sm"
                  type="submit"
                  onClick={getPair}
                >
                  Get Answer From Price Oracle
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div>
          <Card style={{ width: '32rem' }} className="mt-5 shadow bg-body rounded">
            <Card.Header as="h5">Result</Card.Header>
            <Card.Body>
              <div className="col">
                <h5>{pairs} ➡ {storedPrice}</h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;