// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@thirdweb-dev/contracts/base/ERC721SignatureMint.sol";

contract Contract is ERC721SignatureMint {
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

    function walletHoldsToken(address _wallet) public view returns (bool) {
        return ERC721SignatureMint(address(this)).balanceOf(_wallet) > 0;
    }
}
