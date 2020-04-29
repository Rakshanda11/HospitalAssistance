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
                        {Object.keys(this.props.historyList).length ? (
                            <Table bordered hover striped className="changestyling1">
                                <thead>
                                    <tr>
                                        <th style={{textAlign: "center"}}>
                                            Date
                                        </th>
                                        <th style={{textAlign: "center"}}>
                                            Summary
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.props.historyList).map(date => (
                                        <tr
                                            key={date}
                                            onClick={() => {
                                                this.props.getDateHistory(date, this.props.historyList[date]);
                                                // this.props.getCurrentP(item);
                                            }}
                                        >

                                            <td style={{ textAlign: "center", width: "25%" }}>{date}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {this.props.historyList[date]["Diagnosis"]}
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