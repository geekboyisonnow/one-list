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

  complete = event => {
    // Figure out the id of the item the user is completing
    // Tell the api that ID=???? is changing to complete
    // reload all the items

    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.id
        }?access_token=fingerlicknfilms`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.reloadAllItems()
      })
  }

  deleteItem = event => {
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.id
        }?access_token=fingerlicknfilms`,
        {
          item: ''
        }
      )
      .then(response => {
        this.reloadAllItems()
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
                  onClick={this.complete}
                  onDoubleClick={this.deleteItem}
                  key={index}
                  className={todoClass}
                  data-id={todo.id}
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
