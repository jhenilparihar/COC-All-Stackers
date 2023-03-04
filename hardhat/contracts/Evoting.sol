//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma abicoder v2;

contract Evoting {
    uint256 public pollsCounter;
    uint256 public usersCounter;
    uint256 public tokenCounter;

    struct Poll {
        uint256 pollid;
        address owner;
        string title;
        string desc;
        string startDate;
        string endDate;
        string options;
        string optionValue;
        uint256 voteCount;
    }

    struct User {
        address accountAddress;
        string name;
        string phone;
        string timeOfRegistry;
        uint256 tokens;
    }

    struct Token {
        uint256 tokenId;
        address owner;
        string timeOfCreation;
    }

    mapping(uint256 => Poll) public allPolls;

    mapping(address => bool) public userExist;

    mapping(uint256 => address) public allAddress;

    mapping(address => User) public allUser;

    // mapping(uint256 => Token) public allToken;

    Token[] allToken;

    function createPoll(
        string memory _title,
        string memory _description,
        string memory _startDate,
        string memory _endDate,
        string memory _options,
        string memory _optionValue
    ) external {
        pollsCounter++;
        Poll memory newPoll = Poll(
            pollsCounter,
            msg.sender,
            _title,
            _description,
            _startDate,
            _endDate,
            _options,
            _optionValue,
            0
        );

        allPolls[pollsCounter] = newPoll;
    }

    function makeVote(uint256 _pollId, string memory _optionValue) public {
        require(msg.sender != address(0));

        require(userExist[msg.sender], "Not Authorized");

        Poll memory poll = allPolls[_pollId];

        address owner = poll.owner;

        require(owner != msg.sender, "Creator of poll can't vote");

        poll.optionValue = _optionValue;

        poll.voteCount += 1;

        allPolls[_pollId] = poll;
    }

    function buyToken(uint256 _tokenCount, string memory _time) public payable {
        require(msg.sender != address(0));

        require(userExist[msg.sender], "Not Authorized");

        require(msg.value >= _tokenCount / 10, "Not enough ethers");

        address payable sendTo = payable(
            0xB641B4F1795a4BfA2cC7056E08cFB2b199831248
        );
        sendTo.transfer(msg.value);
        createToken(_tokenCount, _time);
        User memory user = allUser[msg.sender];
        user.tokens += _tokenCount;
    }

    function createToken(uint256 _tokenCount, string memory _time) internal {
        for (uint256 i = 0; i <= _tokenCount; i++) {
            tokenCounter++;
            Token memory token = Token(tokenCounter, msg.sender, _time);
            allToken.push(token);
        }
    }

    function getAllTransactions() public view returns (Token[] memory) {
        return allToken;
    }

    function addUser(
        string memory _name,
        string memory _phone,
        string memory _timestamp
    ) external {
        // require caller of the function is not an empty address
        require(msg.sender != address(0));

        usersCounter++;

        User memory user = User(msg.sender, _name, _phone, _timestamp, 10);

        createToken(10, _timestamp);

        allUser[msg.sender] = user;

        userExist[msg.sender] = true;

        allAddress[usersCounter] = msg.sender;
    }
}
