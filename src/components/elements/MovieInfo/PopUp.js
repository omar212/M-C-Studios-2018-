import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

class Modal extends React {

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    this.setState({isOpen: true})
  }

  render () {
    return (
      <div>
        <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='L61p2uyiMSo' onClose={() => this.setState({isOpen: false})} />
        <button onClick={this.openModal}>Open</button>
      </div>
    )
  }
}

export default
