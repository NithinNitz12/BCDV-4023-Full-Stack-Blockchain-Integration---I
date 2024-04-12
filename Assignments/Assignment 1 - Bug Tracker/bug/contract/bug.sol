// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract BugTracker {
    struct Bug {
        string bugId;
        string description;
        uint8 criticality; // 0: Low, 1: Medium, 2: High
        bool isDone;
    }
    mapping(address => Bug[]) private Users;

    function addBug(string calldata _bugId, string calldata _description, uint8 _criticality, bool _isDone) external {
        Users[msg.sender].push(Bug({bugId: _bugId, description: _description, criticality: _criticality, isDone: _isDone}));
    }

    function getTask(uint256 _bugIndex) external view returns (Bug memory) {
        Bug storage bug = Users[msg.sender][_bugIndex];
        return bug;
    }

    function UpdateBugStatus(uint256 _bugIndex, bool _status) external {
        Users[msg.sender][_bugIndex].isDone = _status;
    }

    function getBugCount() external view returns (uint256) {
        return Users[msg.sender].length;
    }

    function deleteBug(uint256 _bugIndex) external {
        uint256 lastBugIndex = Users[msg.sender].length - 1; // Index of the last bug
        require(_bugIndex <= lastBugIndex, "Bug index out of bounds"); // Ensure the bug index is valid

        // Move the last element to the position of the one to be deleted (if it's not the same)
        if (_bugIndex < lastBugIndex) {
            Users[msg.sender][_bugIndex] = Users[msg.sender][lastBugIndex];
        }

        // Remove the last element by reducing the array's length
        Users[msg.sender].pop();
    }
}