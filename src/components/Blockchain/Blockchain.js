import React, { Component } from "react";
import Block from "./Block";
class BlockChain extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">BLOCKCHAIN</h1>
                <div className="container">
                    <Block />
                </div>
            </div>
        );
    }
}

export default BlockChain;