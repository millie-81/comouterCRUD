import React from "react";
import {isEmpty} from "../util/isEmpty";

class UpdateComputer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id:"",
            formData:{
                status:"",
                label:"",
                price:"",
                type:""
            },
            errors:{
                id:"",
                status:"",
                label:"",
                price:"",
                type:""
            },
            response:""

        }
    }

    handleUpdate = (id,e) =>{
        e.preventDefault()
        let errors = this.validateError()
        if(isEmpty(errors)){
            fetch("http://localhost:8080/api/v1/computers/" + id,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(this.state.formData)
            }).then(response =>{
                if(!response.ok){
                    if(response.status == 400){
                        throw new Error("bad request")
                    }
                    else{
                        throw new Error("internal error")
                    }
                }else{
                    return response.json()
                }
            }).then(response =>{
                alert("update successfully")
            }).catch((error) =>{
                console.log(error.message)
                this.setState({
                    id: this.state.id,
                    ...this.state.formData,
                    ...this.state.errors,
                    response:error.message
                })
                }
            )
        }
        else{
            this.setState({
                errors:errors
            })
        }
    }

    handleInputId = (event)=>{
        let idValue
        let fieldName = event.target.name
        let fieldValue = event.target.value
        if(fieldName == "id"){
            idValue= fieldValue
        }

        this.setState({
            id:idValue,
            formData: {
                ...this.state.formData,
            }
            })
    }

    handleInput = (event) =>{
        let fieldName = event.target.name
        let fieldValue = event.target.value

        this.setState({
            id:this.state.id,
            formData: {
                ...this.state.formData,
                [fieldName]:fieldValue
            }
        })
    }

    validateError = () =>{
        let errors = {}
        if(this.state.id == ""){
            errors.id = "the id cannot be empty"
        }
        if(this.state.formData.status == ""){
            errors.status = "the status cannot be empty"
        }
        if(this.state.formData.label == ""){
            errors.status = "the label  cannot be empty"
        }
        if(this.state.formData.price == ""){
            errors.status = "the price cannot be empty"
        }
        if(this.state.formData.type == ""){
            errors.status = "the type cannot be empty"
        }
        return errors
    }

    render(){
        return(
            <div>
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    this.handleUpdate(this.state.id,e)
                }
                }>
                    {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div> }
                    <label>id</label>
                    <input name="id" type={"number"} className={"form-control"} value={this.state.id} onChange={this.handleInputId}/>
                    <div className={"text-danger"}>{this.state.errors.id}</div>
                    <br />
                    <label>status</label>
                    <input name="status" type={"text"} className={"form-control"} value={this.state.formData.status} onChange={this.handleInput}/>
                    <div className={"text-danger"}>{this.state.errors.status}</div>
                    <br />
                    <label>label</label>
                    <input name="label" type={"text"}  className={"form-control"} value={this.state.formData.label} onChange={this.handleInput}/>
                    <div className={"text-danger"}>{this.state.errors.label}</div>
                    <br />
                    <label>price</label>
                    <input name="price" type={"number"} className={"form-control"} value={this.state.formData.price} onChange={this.handleInput}/>
                    <div className={"text-danger"}>{this.state.errors.price}</div>
                    <br />
                    <label>type</label>
                    <input name="type" type={"text"} className={"form-control"} value={this.state.formData.type} onChange={this.handleInput}/>
                    <div className={"text-danger"}>{this.state.errors.label}</div>
                    <br />
                    <button type={"submit"}>update</button>
                </form>
            </div>
        )
    }
}

export default UpdateComputer;