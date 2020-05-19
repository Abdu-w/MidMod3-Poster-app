import React from 'react';
import '../styles/Comment.css';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newText: '',
      listText: []
    };
  }

  addText() {
    const newText = {
      id: Math.random()+1,
      value: this.state.newText.slice()
    };

    const listText = [...this.state.listText];
      listText.unshift(newText);

    this.setState({
      newText: '',
      listText,
    });
  }

  deleteText(id) {
    const listText = [...this.state.listText];
    const updatedList = listText.filter(text => text.id !== id);

    this.setState({ 
        listText:
        updatedList 
    });
  }

  updateText(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div>
         <div className='comment-container'>
          <div className='comment-title'>
            Leave a question or comment!
            <br />
            <input
                type='text'
                placeholder='Type here'
                value={this.state.newText}
                onChange={e => this.updateText('newText', e.target.value)}
            />
          <button
            onClick={() => this.addText()}
            disabled={!this.state.newText.length}
          >
          <button className= 'submit-btn'> Submit </button>
          </button>
          <div className = 'comment-child'>
            <ul>
                {this.state.listText.map(text => {
                return (
                    <li key={text.id}>
                    {text.value}
                    <button onClick={() => this.deleteText(text.id)}
                    >X</button>
                    </li>
                );
                })}
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default  Comment;