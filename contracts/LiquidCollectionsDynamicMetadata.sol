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
        string
            memory cid = "bafybeiblzu7xvvcepkarrblpduffm54cncr33ndyabcd5vf7ccwhlsrufq";
        string memory fancyId = Strings.toString(_tokenId + 1);
        string memory redeemed = " [REDEEMED]";
        string memory nameFancyIdAndRedeemedMaybe;
        string memory redeemable;
        bytes memory animationurl;

        if (isRedeemable(_tokenId)) {
            redeemable = "true";
            nameFancyIdAndRedeemedMaybe = fancyId;
            animationurl = abi.encodePacked(
                // "https://bafybeids3hmvw24ymjkdfrtjjxxvnwgciwyggubeuw4nziyova2ervdbpm.ipfs.nftstorage.link/pre/",
                "https://",
                cid,
                ".ipfs.nftstorage.link/pre/",
                fancyId,
                ".jpg"
            );
        } else {
            redeemable = "false";
            // titleId = string.concat(uid, redeemed);
            nameFancyIdAndRedeemedMaybe = string(
                bytes.concat(bytes(fancyId), bytes(redeemed))
            );
            animationurl = abi.encodePacked(
                // "https://bafybeids3hmvw24ymjkdfrtjjxxvnwgciwyggubeuw4nziyova2ervdbpm.ipfs.nftstorage.link/post/",
                "https://",
                cid,
                ".ipfs.nftstorage.link/post/",
                fancyId,
                ".jpg"
            );
        }

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "OPJ Gin #',
            nameFancyIdAndRedeemedMaybe,
            '",',
            '"description": "a description goes here",',
            '"image": "',
            animationurl,
            '",',
            '"animation_url": "',
            animationurl,
            '",',
            '"attributes": [ { "trait_type": "Spirit", "value": "Gin" } ],',
            '"redeemable": ',
            redeemable,
            "",
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
