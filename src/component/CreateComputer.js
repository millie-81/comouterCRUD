import React from "react";
import {isEmpty} from "../util/isEmpty";

class CreateComputer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                status:"",
                label:"",
                price:"",
                type:"",
            },
            errors:{
                status:"",
                label:"",
                price:"",
                type:"",
            }
        }

    }

    handleInput = (event) =>{
        let fieldName = event.target.name
        let fieldValue = event.target.value
        this.setState({
            formData:{
                ...this.state.formData,
                [fieldName] : fieldValue
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let errors = this.validateError()
        if (isEmpty(errors)) {
            fetch("http://localhost:8080/api/v1/computers", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(this.state.formData)
            }).then(response => {
                if(!response.ok){
                    if(response.status == 400){
                        throw("bad request")
                    }else{
                        throw("internal error")
                    }
                }else{
                   return  response.json()
                }
            }).then(response =>{
                alert("the computer has been created")
                window.location.reload()
            })
        } else {
            this.setState({
                errors: errors
            })
        }

    }
    validateError = () => {
       let errors = {}
        if(this.state.formData.status == ""){
            errors.status = "the status cannot be empty"
        }
        if(this.state.formData.label == ""){
            errors.status = "the label cannot be empty"
        }
        if(this.state.formData.price == ""){
            errors.price = "the price cannot be empty"
        }
        if(this.state.formData.type == ""){
            errors.type = "the type cannot be empty"
        }
        return errors
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>status</label>
                        <input  type={"text"} name={"status"} value={this.state.formData.status} onChange={this.handleInput}/>
                        <div className={"text-danger"}>{this.state.errors.status}</div>
                    </div>
                    <div>
                        <label>label</label>
                        <input type={"text"}  name={"label"} value={this.state.formData.label}  onChange={this.handleInput}/>
                        <div className={"text-danger"}>{this.state.errors.label}</div>
                    </div>
                    <div>
                        <label>price</label>
                        <input type={"text"} name={"price"} value={this.state.formData.price}  onChange={this.handleInput}/>
                        <div className={"text-danger"}>{this.state.errors.price}</div>
                    </div>
                    <div>
                        <label>type</label>
                        <input type={"text"} name={"type"} value={this.state.formData.type}  onChange={this.handleInput}/>
                        <div className={"text-danger"}>{this.state.errors.type}</div>
                    </div>
                    <button type={"submit"}>submit</button>
                </form>
            </div>
        )
    }



}

export default CreateComputer;