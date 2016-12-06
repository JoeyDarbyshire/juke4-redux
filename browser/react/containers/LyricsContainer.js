import React, { Component } from 'react';
import store from '../store';
import Lyrics from "../components/Lyrics";
import { setLyrics } from '../action-creators/lyrics';
import axios from 'axios';


class LyricsContainer extends Component {
  constructor () {
    super();
    this.state = Object.assign({},
      store.getState(),
      {
        artistQuery: "",
        songQuery: ""
      }
    );
    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  setArtist (text) {
    this.setState({
      artistQuery: text
    })
  }

  setSong (text) {
    this.setState({
      songQuery: text
    })

  }

  handleSubmit (evt) {
    evt.preventDefault();
    if (this.state.artistQuery && this.state.songQuery){
      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      .then( response => {
        const lyricAction = setLyrics(response.data.lyric);
        store.dispatch(lyricAction)
      })
    }
  }

  render () {
    return (
      <Lyrics
        text={this.state.text}
        setArtist={this.setArtist}
        setSong={this.setSong}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        submit={this.handleSubmit}
        />
    )
  }

}

export default LyricsContainer;