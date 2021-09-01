import React from "react";

//get a computer
class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idNumber: "",
            data: []
        }
    }

    handleInput = (event) => {
        this.setState({
            idNumber: event.target.value,
            data: []
        })
    }

    handleSearch = (idNumber) => {
        fetch("http://localhost:8080/api/v1/computers/" + idNumber, {
            method: "GET"
        }).then(response => response.json()).then(response => {
            this.setState({
                idNumber: "",
                data: response.result
            })
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleSearch(this.state.idNumber)
                }
                }>
                    <label>id</label>
                    <input name="id" type={"text"} value={this.state.idNumber} onChange={this.handleInput}/>
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


                    <tr>
                        <td>{this.state.data.id}</td>
                        <td>{this.state.data.status}</td>
                        <td>{this.state.data.label}</td>
                        <td>{this.state.data.price}</td>
                        <td>{this.state.data.type}</td>
                        <td>{this.state.data.createdAt}</td>
                        <td>{this.state.data.modifiedAt}</td>
                    </tr>


                </table>
            </div>
        )
    }

}

export default EditForm;