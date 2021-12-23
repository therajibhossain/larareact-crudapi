import React, {Component} from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default class EditStudent extends Component {
    render() {
        const props = this.props;
        const {editStudentModal, toggleEditStudentModal, editStudentData, onChangeEditStudentHandler, updateStudent} = props;

        return (
            <div>
                <Modal isOpen={editStudentModal} toggle={toggleEditStudentModal}>
                    <ModalHeader toggle={toggleEditStudentModal}>Update Student</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" value={editStudentData.first_name} onChange={onChangeEditStudentHandler} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input  id="last_name" name="last_name" value={editStudentData.last_name} onChange={onChangeEditStudentHandler} />
                        </FormGroup>
            
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" value={editStudentData.email} onChange={onChangeEditStudentHandler} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone" value={editStudentData.phone} onChange={onChangeEditStudentHandler} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={updateStudent}>Update</Button>
                        <Button color="secondary" onClick={toggleEditStudentModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div> 
        );
    }
}