import React, { Component } from "react";
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

export default class AddStudents extends Component {    
    render() {
        const props = this.props;
        const {toggleNewStudentModal, newStudentData, onChangeAddStudentHandler} = props;

        return (
            <div>
                <Button className="float-right mb-4" color="primary" onClick={toggleNewStudentModal}>Add Student</Button>

                <Modal isOpen={props.newStudentModal} toggle={toggleNewStudentModal}>
                    <ModalHeader>Add new Student</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" value={newStudentData.first_name} onChange={onChangeAddStudentHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name" value={newStudentData.last_name} onChange={onChangeAddStudentHandler} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" value={newStudentData.email} onChange={onChangeAddStudentHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone" value={newStudentData.phone} onChange={onChangeAddStudentHandler} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => props.addStudent()}> Add </Button>
                        <Button color="secondary" onClick={toggleNewStudentModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>             
        );
    }
}