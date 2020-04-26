pragma solidity >=0.4.21 <0.7.0;

interface Erc20 {
    function approve(address _spender, uint256 _value) external returns (bool success);
    function transfer(address _to, uint256 _value) external returns (bool success);
}

interface CErc20 {
    function mint(uint256 mintAmount) external returns (uint256);
    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
}

contract CErc20Supplier {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You must be the owner of the contract to call this function.");
        _;
    }

    function supplyToCompound(
        address _erc20TokenContractAddress,
        address _cTokenContractAddress,
        uint256 amountToSupply
    ) public onlyOwner returns (bool) {
        Erc20 erc20TokenContract = Erc20(_erc20TokenContractAddress);
        CErc20 cTokenContract = CErc20(_cTokenContractAddress);

        erc20TokenContract.approve(address(cTokenContract), amountToSupply);
        cTokenContract.mint(amountToSupply);

        return true;
    }

    function redeemCToken(
        address _erc20TokenContractAddress,
        address _cTokenContractAddress,
        uint256 amount
    ) public onlyOwner returns (bool) {
        CErc20 cTokenContract = CErc20(_cTokenContractAddress);
        Erc20 erc20TokenContract = Erc20(_erc20TokenContractAddress);

        cTokenContract.redeemUnderlying(amount);

        erc20TokenContract.transfer(msg.sender, amount);

        return true;
    }
}