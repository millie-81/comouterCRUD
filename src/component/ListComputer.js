import React from "react";

// list and delete computer
class ListComputer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/v1/computers").then(response => response.json()).then(response =>
        this.setState({
            data: response.result
        }))
    }

    handleDelete = (id) => {
        fetch("http://localhost:8080/api/v1/computers/" + id , {
            method:"DELETE"
        }).then(response => response.json()).then(response =>{
            if(response.result){
                alert("successful delete")
                window.location.reload()
            }
        })
    }



    render(){
        return(
            <div>
                <p>computer list</p>
                <table className={"table"}>
                    <tr>
                        <th>id</th>
                        <th>status</th>
                        <th>label</th>
                        <th>price</th>
                        <th>type</th>
                        <th>createAt</th>
                        <th>modifiedAt</th>
                    </tr>
                    {this.state.data.map((item) =>{
                        return(
                            <tr key = {item.id}>
                                <td>{item.id}</td>
                                <td>{item.status}</td>
                                <td>{item.label}</td>
                                <td>{item.price}</td>
                                <td>{item.type}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.modifiedAt}</td>
                                <td><button onClick={() => this.handleDelete(item.id)}>delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default ListComputer;