import React, { Component } from 'react';
import './note-card.css';

class NoteCard extends Component {
  render() {
    const { note } = this.props;
    return(
    <div class="col-md-3" style={{borderRadius:5}}>
    	<div class="our-team-main">
	        <div class="team-front">
	            <h3>{note.title}</h3><br></br>
	            <p>Created At-: {note.created_at}</p>
	            <p>Modified At-: {note.modified_at}</p><br></br>
	        </div>
	      <div class="team-back">
	        <span>
            {note.content}
	        </span>
	      </div>
	    </div>
	  </div>
    );
  }
}

export default NoteCard;