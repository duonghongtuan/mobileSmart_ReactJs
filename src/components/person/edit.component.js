import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this)
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            age: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: "******",
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangePasswordConfirm(e) {
        this.setState({
            password_confirm: e.target.value
        })
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            username: this.state.username,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
        }
        axios.put('http://localhost:4000/editUser/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("user",JSON.stringify(res.data))
                this.props.history.push('/profile')
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
                alert("Vui l??ng ki???m tra l???i m???t kh???u!")
            })
        //this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <div className="row" style={{ marginTop: '40px' }}>
                    <div className="col-md-4 offset-md-4">
                        <h3 align="center">Ch???nh s???a th??ng tin c?? nh??n</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>T??n ng?????i d??ng:  </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <div className="form-group">
                                <label>M???t Kh???u: </label>
                                <input type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nh???p l???i m???t kh???u: </label>
                                <input type="password" className="form-control" value={this.state.password_confirm}
                                    onChange={this.onChangePasswordConfirm}
                                    required
                                />
                            </div>
                            <div className="form-group divcenter">
                                <input type="submit"
                                    value="C???p nh???t"
                                    className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}