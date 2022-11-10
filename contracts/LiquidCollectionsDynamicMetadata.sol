import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./LiquidCollections.sol";

contract LiquidCollectionsDynamicMetadata is LiquidCollections {
    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    )
        LiquidCollections(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {}

    /*///////////////////////////////////////////////////////////////
                    Overriden ERC 721 logic
    //////////////////////////////////////////////////////////////*/

    /**
     *  @notice         Returns the metadata URI for an NFT.
     *  @dev            See `BatchMintMetadata` for handling of metadata in this contract.
     *
     *  @param _tokenId The tokenId of an NFT.
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        // (uint256 batchId, ) = _getBatchId(_tokenId);
        // string memory batchUri = _getBaseURI(_tokenId);
        // if (isEncryptedBatch(batchId)) {
        //     return string(abi.encodePacked(batchUri, "0"));
        // } else {
        //     return string(abi.encodePacked(batchUri, _tokenId.toString()));
        // }
        // return "hello";
        string memory uid = Strings.toString(_tokenId);
        string memory redeemed = " [REDEEMED]";
        string memory titleId;
        string memory redeemable;
        if (isRedeemable(_tokenId)) {
            redeemable = "true";
            titleId = uid;
        } else {
            redeemable = "false";
            // titleId = string.concat(uid, redeemed);
            titleId = string(bytes.concat(bytes(uid), bytes(redeemed)));
        }

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "My721Token #',
            titleId,
            '",',
            '"foo": "bar",',
            '"redeemable": ',
            redeemable,
            "",
            // Replace with extra ERC721 Metadata properties
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    // /*///////////////////////////////////////////////////////////////
    //                 Overriden ERC 721 logic
    // //////////////////////////////////////////////////////////////*/

    // /**
    //  *  @notice         Returns the metadata URI for an NFT.
    //  *  @dev            See `BatchMintMetadata` for handling of metadata in this contract.
    //  *
    //  *  @param _tokenId The tokenId of an NFT.
    //  */
    // function tokenURI(uint256 _tokenId)
    //     public
    //     view
    //     virtual
    //     override
    //     returns (string memory)
    // {
    //     string memory uid = Strings.toString(_tokenId);
    //     bytes memory dataURI = abi.encodePacked(
    //         "{",
    //         '"name": "My721Token #',
    //         uid,
    //         '"image": "image #',
    //         uid,
    //         '"',
    //         '"foo": "bar"',
    //         // Replace with extra ERC721 Metadata properties
    //         "}"
    //     );

    //     return
    //         string(
    //             abi.encodePacked(
    //                 "data:application/json;base64,",
    //                 Base64.encode(dataURI)
    //             )
    //         );
    // }
}
