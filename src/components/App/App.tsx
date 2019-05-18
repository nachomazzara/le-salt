import React, { Component } from 'react'

import Text from '../../components/Text'
import Salt from '../../components/Salt'

import './App.css'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

type AppState = {
  salt: string
}

export default class App extends Component<any, AppState> {
  shaker: HTMLElement | null
  clearShaker: number

  constructor(props: any) {
    super(props)

    this.shaker = null
    this.clearShaker = 0

    this.state = {
      salt: ''
    }
  }

  generate = () => {
    const { shaker } = this
    if (shaker) {
      clearTimeout(this.clearShaker)
      shaker.setAttribute('class', 'shake')
      this.clearShaker = window.setTimeout(() => {
        shaker.setAttribute('class', '')
      }, 1000)
    }

    this.setState({
      salt: web3.utils.randomHex(32)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{'Le Salt'}</h1>
        <h2>{'Generate Random 32-Bytes Hex'}</h2>
        <div className="wrapper">
          <button className="generate" onClick={this.generate}>
            {'Shake'}
          </button>
          <Salt shaker={(el: any) => (this.shaker = el)} />
          <Text text={this.state.salt} />
        </div>
        <div className="footer">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/nachomazzara/le-salt"
          >
            {'{code} 👨‍💻'}
          </a>
        </div>
      </div>
    )
  }
}
