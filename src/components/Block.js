import React, { Component } from "react";
class Block extends Component {
    render() {
        return (
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-sm-6 align-self-center">
                    <div class="card text-center">
                        <div className="container">
                            <label>Previous Hash</label>
                            <p className="text-success">"093fadfdf"</p>
                            <label>Hash</label>
                            <p className="text-success">"093fadfdf"</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Block;