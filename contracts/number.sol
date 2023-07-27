// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract number {
    
    uint public count;

    event increased(uint count);
    event decreased(uint count);

    function increaseCount() public {
        count+=1;
        emit increased(count);
    }

    function decreaseCount() public {
        require(count>0,"Count cannot be less than 0");
        count-=1;
        emit decreased(count);
    }
}