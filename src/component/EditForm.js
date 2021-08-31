import React from "react";

//get a computer
class EditForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            idNumber:"",
            data:[]
        }
    }

    handleInput = (event) =>{
        this.setState({
            idNumber: event.target.value,
            data:[]
        })
    }

    handleSearch = (idNumber) =>{
        fetch("http://localhost:8080/api/v1/computers/" + idNumber,{
            method:"GET"
        }).then(response =>response.json()).then(response =>{
            this.setState({
                idNumber:"",
                data:response.result
            })
        })
    }


    render(){
        return(
            <div>
                <form onSubmit={() =>{this.handleSearch(this.state.idNumber)}}>
                    <label>id</label>
                    <input name = "id" type={"text"} value={this.state.idNumber} onChange={this.handleInput}/>
                    <button type={"submit"}>search</button>
                </form>
                <table>
                    <tr>
                        <th>id</th>
                        <th>status</th>
                        <th>label</th>
                        <th>price</th>
                        <th>type</th>
                        <th>createdAt</th>
                        <th>modified</th>
                    </tr>

                        {this.state.data.map( (item) =>{
                           return(
                               <tbody>
                                   <td>{item.id}</td>
                                   <td>{item.status}</td>
                                   <td>{item.label}</td>
                                   <td>{item.price}</td>
                                   <td>{item.type}</td>
                                   <td>{item.createdAt}</td>
                                   <td>{item.modifiedAt}</td>
                               </tbody>
                               )
                        })}

                </table>
            </div>
        )
    }

}
export default EditForm;