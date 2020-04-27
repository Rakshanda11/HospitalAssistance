import React from "react";
import { Card, Table } from "reactstrap";
import FreeScrollBar from "react-free-scrollbar";
import Loading from "./Loading";
import "./HistoryList.css";

class HistoryList extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log("in his List");
        console.log(this.props.historyList);

        return (
            <Card className="border-secondary ">
                <div className="scroll-bar" >
                    <FreeScrollBar>
                        {this.props.historyList.length ? (
                            <Table bordered hover striped className="changestyling1">
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >
                                            Date
                        </th>
                                        <th
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >
                                            Summary
                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.historyList.map(item => (
                                        <tr
                                            key={item.PatientId}
                                            onClick={() => {
                                                this.props.getDateHistory(item.Date);
                                                // this.props.getCurrentP(item);
                                            }}
                                        >

                                            <td style={{ textAlign: "center", width: "25%" }}>{item.Date}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {item.Diagnosis}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                                <Loading />
                            )}
                    </FreeScrollBar>
                </div>
            </Card>
        );

    };

}
export default HistoryList;