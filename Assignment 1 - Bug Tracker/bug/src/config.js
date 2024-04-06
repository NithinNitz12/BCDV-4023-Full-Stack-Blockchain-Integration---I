const contractAddress = "0xe9aaFF12eC78E53e5aaC5a83E27dC9B6B4Fb7977";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_bugId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_criticality",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_isDone",
        type: "bool",
      },
    ],
    name: "addBug",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bugIndex",
        type: "uint256",
      },
    ],
    name: "deleteBug",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bugIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "UpdateBugStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBugCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bugIndex",
        type: "uint256",
      },
    ],
    name: "getTask",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "bugId",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "criticality",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isDone",
            type: "bool",
          },
        ],
        internalType: "struct BugTracker.Bug",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

module.exports = { contractAddress, contractABI };