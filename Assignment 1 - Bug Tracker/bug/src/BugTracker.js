import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { CardContent, Typography } from "@mui/material";

import { contractABI, contractAddress } from "./config";
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
  // const [strikeThrough, setStrikeThrough] = useState(false);

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
      <Input
        type="text"
        value={bugId}
        placeholder="Bug ID"
        onChange={(e) => setBugId(e.target.value)}
      />
      <br />
      <br />
      <Input
        type="text"
        value={description}
        placeholder="Bug Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <Box sx={{ minWidth: 120 }}>
        <Select
          value={criticality}
          onChange={(e) => setCriticality(e.target.value)}
        >
          <MenuItem value="0">Low</MenuItem>
          <MenuItem value="1">Medium</MenuItem>
          <MenuItem value="2">High</MenuItem>
        </Select>
      </Box>
      <br />
      <br />
      <Checkbox
        type="checkbox"
        checked={isDone}
        onChange={(e) => setIsDone(e.target.checked)}
      />{" "}
      Is Done?
      <br />
      <br />
      <Button variant="outlined" onClick={handleCreateBug}>
        Add Bug
      </Button>
      <Box sx={{ minWidth: 275 }}>
        {/* {bugs.map((bug, index) => (
          <>
            <Card variant="outlined" key={index}>
              ID: {bug.bugId}, Description: {bug.description}, Criticality:
              {getCriticalitylLabel(bug.criticality.toString())}, Done:{" "}
              {bug.isDone.toString()}
            </Card>
          </>
        ))} */}
        <ul>
        {bugs.map((bug, index) => (
          <Card variant="outlined" key={index} sx={{ margin: 2 }}>
            <CardContent>
              <Typography variant="h6">Bug ID: {bug.bugId}</Typography>
              <Typography variant="body1">Bug Description: {bug.description}</Typography>
              <Typography variant="body1">Bug Criticality: {getCriticalitylLabel(bug.criticality.toString())}</Typography>
              <Typography variant="body1">Is Bug Done/Resolved: {bug.isDone.toString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </ul>
      </Box>
    </div>
  );
}

export default BugTracker;
