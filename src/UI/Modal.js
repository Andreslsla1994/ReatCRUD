import React from 'react'
import {
  Modal as Mod,
  ModalHeader,
  ModalBody
} from 'reactstrap'

export default function Modal(props) {
  const { title, show, controlModal } = props
  return (
    <Mod isOpen={show} toggle={controlModal}>
      <ModalHeader toggle={controlModal}>{title}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
      {/* <ModalFooter>
        <button className="btn btn-primary" onClick={controlModal}>Do Something</button>
      </ModalFooter> */}
    </Mod>
  )
}
