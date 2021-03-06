import React, { Component } from 'react';
import { render } from 'react-dom';
import '../styles/Home.css';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            query: '', 
            result: []
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.onQueryChange = this.onQueryChange.bind(this)
        // this.finalResult = this.finalResult.bind(this)
    }

    onQueryChange(e) {
        const value = e.target.value;
        this.setState(state => ({ query: value }))
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                let DONE = 4; // readyState 4 means the request is done.
                let OK = 200; // status 200 is a successful return.
                console.log(xhr.status)
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK)
                    console.log('OK')
                        this.setState(state => {
                            return {
                                result: JSON.parse(xhr.responseText),
                            };
                        });
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            };

            xhr.open('GET', '/api/query?query=' + encodeURIComponent(this.state.query));
            xhr.send(null);
        }
    }
    render() {
        let resQuery=[];
        if(this.state.result.rows !== null && this.state.result.rows !== undefined){
            for(let i=0; i<this.state.result.rows.length; i+=1){
                resQuery.push(<p>{this.state.result.rows[i].name}</p>)
            }
        }
        return (
            <div>
                <input type='text' className='queryInput' placeholder='Enter Query' value={this.state.query} onChange={this.onQueryChange} onKeyPress={this.handleKeyPress}></input>
                <div>
                    {resQuery}
                </div>
            </div>
        )
    }
}
export default Home;