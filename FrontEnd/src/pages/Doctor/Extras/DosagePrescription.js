import React from 'react';
import './DosagePrescription.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class DosagePrescription extends React.Component {
  isUpdated = false;

  state = {
    showIcons: null,
    showInput: false,
    listOfMedicines: [
      {
        name: "A",
        dose: "3 times a day",
        duration: "2 days"
      },
      {
        name: "B",
        dose: "2 times a day",
        duration: "4 days"
      }
    ]
  }


  tempPrescriptionList ={}

  node = null;
  onChangeHandlerPrescription = (event) => {
    var name = event.target.name;
    this.tempPrescriptionList[name] = event.target.value;
    this.props.prescriptionChangeHandler(this.state.listOfMedicines, this.tempPrescriptionList)
  }
  handleClick = (event) => {
    if (this.node == null) return;
    if (this.node.contains(event.target)) return;

    this.setState(prevState => ({
      showInput: !prevState.showInput
    }))
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // drugName = "";
  // dose = "";
  // duration = "";

  addMedicine = () => {
    this.setState(prevState => ({
      listOfMedicines: prevState.listOfMedicines.push(this.inputelement)
    }))

  }


  buttonElement = (
    <button className="text-success" onClick={() => {
      if (this.state.showInput) {
        if (this.tempPrescriptionList.name.length > 0 && this.tempPrescriptionList.dose.length > 0 && this.tempPrescriptionList.duration.length > 0) {
          console.log(this.state.listOfMedicines)
          this.setState(prevState => ({
            listOfMedicines: [...prevState.listOfMedicines, {...this.tempPrescriptionList}]
          }), () => {
            // console.log('list');
            // console.log([...this.state.listOfMedicines]);
            this.props.prescriptionChangeHandler(this.state.listOfMedicines, this.tempPrescriptionList)
          })
        } else {
          alert("Enter complete dose information!")
        }

      }
      this.setState(prevState => ({
        showInput: !prevState.showInput
      }))
    }
    }>
      Add
    </button>
  )

  inputelement = (
    <tr ref={node => this.node = node}>
      <td className="pt-3-half"><input type="text" name = "name" onChange={this.onChangeHandlerPrescription}  placeholder="Drug Name"></input></td>
      <td className="pt-3-half"><input type="text" name = "dose" onChange={this.onChangeHandlerPrescription}  placeholder="Dose"></input></td>
      <td className="pt-3-half"><input type="text" name = "duration" onChange={this.onChangeHandlerPrescription} placeholder="Duration"></input></td>
      <td>
        <span className="table-remove">
          {this.buttonElement}
        </span>
      </td>

    </tr>
  )


  render() {
    console.log("Props")
    console.log(this.props)
    if ( !this.isUpdated ){
      this.setState({
        listOfMedicines : this.props.prescriptionData
      })
      this.isUpdated = true
    }
    // this.listOfMedicines = this.props.prescriptionData;
    return (
      <div>
        <div className="card card-color">
          <h3 className="card-header card-header-color text-center font-weight-bold text-uppercase py-4 head-color">Prescription</h3>
          <div className="card-body">
            <div id="table" className="table-editable">
              <table className="table table-bordered table-responsive-md  text-center">
                <thead>
                  <tr key="row">
                    <th className="text-center">Drug Name</th>
                    <th className="text-center">Dose</th>
                    <th className="text-center">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listOfMedicines.map((medicine, index) => {
                    return (
                      <tr className="table-row"
                        key={index}
                        onMouseEnter={() => {
                          this.setState({
                            showIcons: medicine
                          })
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            showIcons: null
                          })
                        }}
                      >
                        <td className="pt-3-half" contentEditable="true" suppressContentEditableWarning={true}>{medicine.name}</td>
                        <td className="pt-3-half" contentEditable="true" suppressContentEditableWarning={true}>{medicine.dose}</td>
                        <td className="pt-3-half" contentEditable="true" suppressContentEditableWarning={true}>{medicine.duration}</td>
                        {/* <td className="button-section ">
                          <span className="table-edit">
                            <button type="button"
                              className="btn btn-danger btn-rounded btn-sm my-0">Edit
                            </button>
                          </span>
                          <span className="table-remove">
                            <button type="button"
                              className="btn btn-danger btn-rounded btn-sm my-0">Remove
                            </button>
                          </span>
                        </td> */}
                        {this.state.showIcons === medicine ? <td className="icon-cell px-0" >
                          {/* <EditIcon className="edit-icon" color="secondary" /> */}
                          <IconButton size="small" onClick={() => {
                            var array = this.state.listOfMedicines.filter((value) => { return value !== medicine })
                            this.setState({
                              listOfMedicines: array
                            })
                          }}>
                            <DeleteIcon className="delete-icon" color="secondary"></DeleteIcon>
                          </IconButton>
                        </td> : null}
                      </tr>
                    )
                  })}
                  {this.state.showInput ? this.inputelement : null}
                </tbody>
              </table>
              <span className="table-add float-right right-shift ">
                {this.state.showInput ? null : this.buttonElement}
              </span>
            </div>
          </div>
        </div>
        <div className="buttons-align">
          <button className="btn btn-danger align-save">Save</button>
          <button className="btn btn-success align-print">Print</button>
        </div>
      </div>
    );
  }
}
export default DosagePrescription;