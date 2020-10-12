import React, { Component } from 'react';

import { v4 as uuidv4 } from 'uuid';
import  { trim } from "jquery";


class FormInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: ["", "Email", "Phone", "Link"],
            inputValue:"",
            nameValue:"",
            errorMes:"",
        }
    }

    inputField = React.createRef("");

    setinputFieldAttribut = (placeholder, name, type, disabled) => {
        this.inputField.current.placeholder = placeholder;
        this.inputField.current.name = name;
        this.inputField.current.disabled = disabled;
        this.setState(prevState => ({ ...prevState, nameValue: name}))
        
    }

    formValidation = (nameVal, inputVal) => {

        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const regexLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const regexPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

        let  newForm ={}, trimVal = trim(inputVal);

        if( nameVal === "email" && regexEmail.test(trimVal)) {
            newForm = {type: nameVal, value: inputVal, id: uuidv4() }
        } else if(nameVal === "phone" && regexPhone.test(trimVal)) {
            newForm = {type: nameVal, value: inputVal, id: uuidv4() }
        } else if(nameVal === "link" && regexLink.test(trimVal)) {
            newForm = {type: nameVal, value: inputVal, id: uuidv4() }
        } else {
            console.log("the field is not correct");
            this.setState(state => ({
                ...state,
                errorMes: `this is not a valid ${nameVal}`
            }));

            setTimeout(() => {
                this.setState(state => ({
                    ...state,
                    errorMes:""
                }))
            },2000);
        }

        if(Object.keys(newForm).length) {
            this.props.addForm(newForm);
           
             this.setState(state => ({
                ...state,
                inputValue: "",
            }));
        }  
    }

    setFieldOption = (option) => {
        if(option === "Email") {
            this.setinputFieldAttribut("email@example.com", "email", false)
        } else if(option === "Phone") {
            this.setinputFieldAttribut("+78900456134", "phone", false)
        } else if(option === "Link") {
            this.setinputFieldAttribut("http://www.example.com", "link", false); 
        } else {
            this.inputField.current.placeholder = "";
            this.inputField.current.disabled = true;
        }
        return;
    }

    handleChangeFieldOption = (e) => {
        this.setFieldOption(e.target.value);
    }

    handleChangeFieldInput = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            inputValue: this.inputField.current.value,
        }));
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        this.formValidation(this.state.nameValue, this.state.inputValue);
    }

    render() {

        const {errorMes} = this.state;
        const showbtn = this.state.inputValue.length ? "" : "hide";

        return (
            <form className="form" onSubmit={this.handleSubmitForm}>
              <div className="form-wrap">
                <div className="input-field">
                  <select onChange={this.handleChangeFieldOption} >
                      {this.state.options.reduce((acc, curr) => {
                          return acc.includes(curr)? acc : [...acc, curr];
                      }, []).map((opt, ind) => {
                          return <option value={opt} key={`${opt}`}>
                              {(opt === "") ? "Please choose a option..." : opt}
                            </option>;
                      })}
                  </select>
                </div>
                <div className="input-field filed-value">
                  <input 
                    placeholder="" 
                    
                    className="validate" 
                    ref={this.inputField}
                    value={this.state.inputValue}
                    name=""
                    type="text"
                    disabled
                    onChange={this.handleChangeFieldInput}
                  />
                  <div className={errorMes ? "errorMes":"errorMes hide"}>{this.state.errorMes}</div>
                </div>
                <div className="btn-wrap">
                  <button 
                    className={`btn waves-effect waves-light green ${showbtn}` }
                    type="submit"
                  >
                      <i className="fas fa-plus"></i>
                  </button>
                  <button
                    className="btn waves-effect waves-light red disabled"
                    >
                      <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
          </form>
        )
    }
}

export default FormInput
