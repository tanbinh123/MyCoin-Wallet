import React, { Component } from "react";
import Block from "./Block";
class Blockchain extends Component {
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

export default Blockchain;