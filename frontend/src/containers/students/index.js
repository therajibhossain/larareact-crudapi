import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import AddStudents from "./addStudent";
import EditStudent from "./editStudent";
import axios from "axios";

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            newStudentData: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",                
            },
            loading: false,
            status: "",
            newStudentModal: false,

            editStudentData: {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                editStudentModal: false,
                noDataFound: "",
            },
            editStudentModal: false,
            noDataFound: "",
        };

        this.apiBaseUrl = `http://localhost:8000/api`;
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents() {
        axios.get(`${this.apiBaseUrl}/students`)
        .then((response) => {
            const resData = response.data;

            if(resData.status === 200) {
                this.setState({
                    students: resData.data ? resData.data : []
                });
            }

            if(resData.status === "failed" && resData.success === false) {
                this.setState({
                    noDataFound: resData.message
                });
            }
        });
    }

    toggleNewStudentModal = () => {
        this.setState({
            newStudentModal: !this.state.newStudentModal
        });
    }

    onChangeAddStudentHandler = (e) => {
        let {newStudentData} = this.state;
        newStudentData[e.target.name] = e.target.value;
        this.setState({newStudentData});
    }

    addStudent = () => {
        axios.post(`${this.apiBaseUrl}/create-student`, this.state.newStudentData)
        .then((response) => {
            const {students} = this.state;
            const newStudents = [...students];

            newStudents.push(response.data);
            this.setState({
                students: newStudents,
                newStudentModal: false,
                newStudentData: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",                
                },
            }, () => this.getStudents());
        });
    };

    toggleEditStudentModal = () => {
        this.setState({
            editStudentModal: !this.state.editStudentModal
        });
    }

    onChangeEditStudentHandler = (e) => {
        let { editStudentData } = this.state;
        editStudentData[e.target.name] = e.target.value;
        this.setState({ editStudentData });
      };

    editStudent = (id, first_name, last_name, email, phone) => {
        this.setState({
            editStudentData: {id, first_name, last_name, email, phone},
            editStudentModal: !this.state.editStudentModal
        });
    }

    updateStudent = () => {
        let {first_name, last_name, email, phone, id} = this.state.editStudentData;
        this.setState({loading: false});

        axios.post(`${this.apiBaseUrl}/create-student`, {
            first_name, last_name, email, phone, id
        }).then((response) => {
            this.getStudents();
            this.setState({
                editStudentModal: false,
                editStudentData: {first_name, last_name, email, phone},
                loading: false
            })
        }).catch((err) => {
            this.setState(false);
            console.log(err.response);
        });
    }

    deleteStudent = (id) => {
        this.setState({loading: true});

        axios.delete(`${this.apiBaseUrl}/student/${id}`)
        .then((response) => {
            this.setState({loading: false});
            this.getStudents();
        }).catch((err) => {
            this.setState({loading: false});
            console.log(err.response);
        });
    }

    render() {
        const {newStudentData, noDataFound, students, newStudentModal, editStudentData, editStudentModal} = this.state;
        let studentsDetails = [];

        if(students.length > 0){
            studentsDetails = students.map((student) => {
                const studentId = student.id;
                return (
                    <tr key={studentId}>
                        <td>{studentId}</td>
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.full_name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-3" onClick={() => this.editStudent(
                                studentId, student.first_name, student.last_name, student.email, student.phone
                            )}>Edit</Button>
                            <Button color="danger" size="sm" onClick={() => this.deleteStudent(studentId)}>Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        
        if(this.state.loading) {
            return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span></div>
        }

        return (
            <div className="App container mt-4">
                <h4 className="font-weight-bold">Students Registration</h4>  

                <AddStudents 
                    toggleNewStudentModal={this.toggleNewStudentModal} 
                    newStudentModal={newStudentModal} 
                    onChangeAddStudentHandler={this.onChangeAddStudentHandler}
                    addStudent={this.addStudent}
                    newStudentData={newStudentData}
                />

                <EditStudent 
                    toggleEditStudentModal={this.toggleEditStudentModal} 
                    editStudentModal={editStudentModal}
                    onChangeEditStudentHandler={this.onChangeEditStudentHandler}
                    editStudent={this.editStudent}
                    editStudentData={editStudentData}
                    updateStudent={this.updateStudent}
                />

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {students.length === 0 ? (
                        <tbody>
                            <tr><td colSpan={7}><h3>{noDataFound}</h3></td></tr>
                        </tbody>
                    ) : (
                        <tbody>{studentsDetails}</tbody>
                    )}
                </Table>
            </div>
        );
    }
}