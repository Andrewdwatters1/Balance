import React, { Component } from 'react'
import alarm from '../../../assets/focusAlert.wav';
import Sound from 'react-sound'

export default class Alert extends Component {
render() {
 return (
   <Sound
   url={alarm}
   playStatus={Sound.status.PLAYING}
   onLoading={this.handleSongLoading}
   onPlaying={this.handleSongPlaying}
   onFinishedPlaying={this.handleSongFinishedPlaying}
   />
  );
 }
}