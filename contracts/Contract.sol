// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721SignatureMint.sol";

import "@thirdweb-dev/contracts/eip/interface/IERC721Enumerable.sol";

contract Contract is ERC721SignatureMint, IERC721Enumerable {
    // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    uint256[] private _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    )
        ERC721SignatureMint(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {}

    // /**
    //  * @dev See {IERC721Enumerable-totalSupply}.
    //  */
    // function totalSupply() public view virtual override returns (uint256) {
    //     return _allTokens.length;
    // }

    function tokenByIndex(uint256 _index)
        external
        view
        override
        returns (uint256)
    {
        // require(
        //     _index < Contract.totalSupply(),
        //     "Contract: global index out of bounds"
        // );
        return _allTokens[_index];
    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index)
        external
        view
        override
        returns (uint256)
    {
        // require(
        //     _index < ERC721SignatureMint.balanceOf(owner),
        //     "Contract: owner index out of bounds"
        // );
        return _ownedTokens[_owner][_index];
    }
}
