import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: ''
    }
  }

  reloadAllItems = () => {
    axios
      .get(
        'https://one-list-api.herokuapp.com/items?access_token=fingerlicknfilms'
      )
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  componentDidMount = () => {
    this.reloadAllItems()
  }

  changeText = event => {
    this.setState({
      newItemText: event.target.value
    })
  }
  // newItem = event => {
  //   event.preventDefault()
  //   console.log(this.state.newItemText)
  // }

  crossedText = event => {
    this.setState({
      complete: true
    })
  }

  newItem = event => {
    event.preventDefault()

    axios
      .post(
        'https://one-list-api.herokuapp.com/items?access_token=fingerlicknfilms',
        {
          item: {
            text: this.state.newItemText
          }
        }
      )
      .then(response => {
        console.log(response.data)
        this.reloadAllItems()
        this.setState({
          newItemText: ''
        })
      })
  }

  // complete: true

  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  onClick={this.setState.complete}
                  key={index}
                  className={todoClass}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.newItem}>
            <input
              value={this.state.newItemText}
              type="text"
              placeholder="Whats up?"
              onChange={this.changeText}
            />
          </form>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; Bacon Loves You!</p>
        </footer>
      </div>
    )
  }
}

export default App
