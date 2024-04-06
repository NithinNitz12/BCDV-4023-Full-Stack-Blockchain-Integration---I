import React, { useState } from "react";
import { contractABI,contractAddress } from "./config";
const { Web3 } = require("web3");

const web3 = new Web3("http://localhost:7545");

const bugTrackerContract = new web3.eth.Contract(contractABI, contractAddress);

function BugTracker() {
  //   console.log(bugTrackerContract);
  const [bugs, setBugs] = useState([]);
  const [bugId, setBugId] = useState("");
  const [description, setDescription] = useState("");
  const [criticality, setCriticality] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleCreateBug = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      // Fetch the current bug count before adding a new bug
      const initialBugCount = await bugTrackerContract.methods
        .getBugCount()
        .call({ from: accounts[0] });
      console.log("Initial bug count:", initialBugCount);

      // Add the new bug
      await bugTrackerContract.methods
        .addBug(bugId, description, criticality, isDone)
        .send({ from: accounts[0], gas: 1000000 });
      console.log("Bug created");

      // Fetch the updated bug count
      const updatedBugCount = await bugTrackerContract.methods
        .getBugCount()
        .call({ from: accounts[0] });
      console.log("Updated bug count:", updatedBugCount);

      // Fetch the newly added bug using the updated bug count
      const newBugIndex = Number(updatedBugCount) - 1; // Assuming the new bug is added at the end
      console.log("hello");
      const newBug = await bugTrackerContract.methods
        .getTask(newBugIndex)
        .call({ from: accounts[0] });
      console.log("New bug:", newBug);

      // Update the UI state with the new bug
      setBugs([...bugs, newBug]);
    } catch (error) {
      console.error("Error adding bug", error);
    }
  };
  function getCriticalitylLabel(criticality) {
    switch (criticality) {
      case "0":
        return "Low";
      case "1":
        return "Medium";
      case "2":
        return "High";
    }
  }
  console.log("Bugs", bugs);
  return (
    <div>
      <h1>BugTracker</h1>
      <input
        type="text"
        value={bugId}
        placeholder="Bug ID"
        onChange={(e) => setBugId(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={criticality}
        onChange={(e) => setCriticality(e.target.value)}
      >
        <option value="0">Low</option>
        <option value="1">Medium</option>
        <option value="2">High</option>
      </select>
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => setIsDone(e.target.checked)}
      />
      <button onClick={handleCreateBug}>Add Bug</button>
      <ul>
        {bugs.map((bug, index) => (
          <li key={index}>
            ID: {bug.bugId}, Description: {bug.description}, Criticality:
            {getCriticalitylLabel(bug.criticality.toString())}, Done: {bug.isDone.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BugTracker;
