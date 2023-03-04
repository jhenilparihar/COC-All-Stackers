//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma abicoder v2;

// NFT smart contract inherits ERC721 interface
contract Ecertify {
    // total number of NFT minted
    uint256 public certificateCounter;
    uint256 public eventCertificateCounter;
    uint256 public extracertificateCounter;
    string convertedHash;

    struct Certificate {
        uint256 certid;
        string transactionHash;
        string name;
        string course;
        string email;
        uint256 passoutYear;
        string percentage;
        uint256 SAP;
        uint256 contact;
        string issueDate;
    }

    struct EventCertificate {
        uint256 certid;
        string transactionHash;
        string name;
        string email;
        string domain;
        uint256 contact;
        string eventName;
        string eventType;
        string eventDate;
        string issueDate;
    }

    struct ExtraCertificate {
        uint256 certid;
        string transactionHash;
        string name;
        string course;
        string email;
        uint256 SAP;
        string certType;
        string issueDate;
        string Ihash;
    }

    // map Certificates's id to Certificate
    mapping(uint256 => Certificate) public allCertificates;

    // map Certificates's id to Certificate
    mapping(uint256 => EventCertificate) public allEventCertificates;


    // map Certificates's id to Certificate
    mapping(uint256 => ExtraCertificate) public allExtraCertificates;

    // map Certificates's hash to Certificate
    mapping(string => Certificate) public allhashedCertificates;

    // map Certificates's hash to Certificate
    mapping(string => EventCertificate) public allhashedEventCertificates;

    // map Certificates's hash to Certificate
    mapping(string => ExtraCertificate) public allhashedExtraCertificates;

    mapping(string => bool) public certficateHashExist;

    mapping(uint256 => bool) public sapIdExist;

    mapping(string => bool) public BonafiedHashExist;

    function addCertificate(
        string memory _name,
        string memory _course,
        string memory _email,
        uint256 _passoutYear,
        string memory _percentage,
        uint256 _SAP,
        uint256 _phone,
        string memory _issueDate
    ) external {
        certificateCounter++;
        // require(!_exists(certificateCounter));

        // create a new Certificate (struct) and pass in new values
        Certificate memory newCert = Certificate(
            certificateCounter,
            "0x0",
            _name,
            _course,
            _email,
            _passoutYear,
            _percentage,
            _SAP,
            _phone,
            _issueDate
        );
        // add the id and it's certificate to allCertificate mapping
        allCertificates[certificateCounter] = newCert;

        sapIdExist[_SAP] = true;
    }


function BonafiedHashUpdate(
        string memory _Ihash
    ) external {
        
        BonafiedHashExist[_Ihash] = true;
    }



function addExtraCertificate(
        string memory _name,
        string memory _course,
        string memory _email,
        uint256 _SAP,
        string memory _type,
        string memory _issueDate,
        string memory _Ihash
    ) external {
        extracertificateCounter++;
        // require(!_exists(certificateCounter));
            bytes32 unique = hash(_name, _SAP);
            convertedHash = bytes32ToString(unique);
        // create a new Certificate (struct) and pass in new values
        ExtraCertificate memory newCert = ExtraCertificate(
            extracertificateCounter,
            convertedHash,
            _name,
            _course,
            _email,
            _SAP,
            _type,
            _issueDate,
            _Ihash
        );
        // add the id and it's certificate to allCertificate mapping
        allExtraCertificates[extracertificateCounter] = newCert;

        sapIdExist[_SAP] = true;
        BonafiedHashExist[_Ihash] = true;
    }

    function updateExtraTransaction(string memory _transactionHash) external {
        ExtraCertificate memory cert = allExtraCertificates[certificateCounter];
        cert.transactionHash = _transactionHash;
        allExtraCertificates[certificateCounter] = cert;
        // add the hash value and it's certificate to allCertificate mapping
        allhashedExtraCertificates[_transactionHash] = cert;
        certficateHashExist[_transactionHash] = true;
    }

    function updateTransaction(string memory _transactionHash) external {
        Certificate memory cert = allCertificates[certificateCounter];
        cert.transactionHash = _transactionHash;
        allCertificates[certificateCounter] = cert;
        // add the hash value and it's certificate to allCertificate mapping
        allhashedCertificates[_transactionHash] = cert;
        certficateHashExist[_transactionHash] = true;
    }

    function getValueAtMapping(string memory userAddress)
        public
        view
        returns (Certificate memory)
    {
        return allhashedCertificates[userAddress];
    }

    function bytes32ToString(bytes32 _bytes32)
        public
        pure
        returns (string memory)
    {
        uint8 i = 0;
        bytes memory bytesArray = new bytes(64);
        for (i = 0; i < bytesArray.length; i++) {
            uint8 _f = uint8(_bytes32[i / 2] & 0x0f);
            uint8 _l = uint8(_bytes32[i / 2] >> 4);

            bytesArray[i] = toByte(_f);
            i = i + 1;
            bytesArray[i] = toByte(_l);
        }
        return string(bytesArray);
    }

    function toByte(uint8 _uint8) public pure returns (bytes1) {
        if (_uint8 < 10) {
            return bytes1(_uint8 + 48);
        } else {
            return bytes1(_uint8 + 87);
        }
    }

    function hash(string memory _string, uint256 _contact)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_string, _contact));
    }

    function addInBulk(Certificate[] memory b) external {
        for (uint256 index = 0; index < b.length; index++) {
            certificateCounter++;
            // require(!_exists(certificateCounter));
            bytes32 unique = hash(b[index].name, b[index].contact);
            convertedHash = bytes32ToString(unique);
            // create a new Certificate (struct) and pass in new values
            Certificate memory newCert = Certificate(
                certificateCounter,
                convertedHash,
                b[index].name,
                b[index].course,
                b[index].email,
                b[index].passoutYear,
                b[index].percentage,
                b[index].SAP,
                b[index].contact,
                b[index].issueDate
            );
            // add the id and it's certificate to allCertificate mapping
            allCertificates[certificateCounter] = newCert;
            certficateHashExist[convertedHash] = true;
        }
        //  allCertificatesInBulk[certificateCounter2] = b;
    }

    function addEventInBulk(EventCertificate[] memory b) external {
        for (uint256 index = 0; index < b.length; index++) {
            eventCertificateCounter++;
            bytes32 unique = hash(b[index].name, b[index].contact);
            convertedHash = bytes32ToString(unique);
            // create a new Certificate (struct) and pass in new values
            EventCertificate memory newCert = EventCertificate(
                eventCertificateCounter,
                convertedHash,
                b[index].name,
                b[index].email,
                b[index].domain,
                b[index].contact,
                b[index].eventName,
                b[index].eventType,
                b[index].eventDate,
                b[index].issueDate
            );
            // add the id and it's certificate to allCertificate mapping
            allEventCertificates[eventCertificateCounter] = newCert;
            certficateHashExist[convertedHash] = true;
        }
        //  allCertificatesInBulk[certificateCounter2] = b;
    }
}
