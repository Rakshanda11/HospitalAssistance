import React from 'react';
import './DosagePrescription.css';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import RXImg from '../../../components/DoctorsModule/rx_img.png';

import firebase from '../../../firebase';

class DosagePrescription extends React.Component {
  today = (new Date()).toDateString();
  daywiseRef = firebase.firestore()
    .collection("Everyday-Patients")
    .doc(this.today);

  isUpdated = false;

  state = {
    showIcons: null,
    showInput: false,
    listOfMedicines: []
  }


  tempPrescriptionList = {}

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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillMount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // drugName = "";
  // dose = "";
  // duration = "";

  addNewDrugEvent = () => {
    if (this.state.showInput) {
      if (Object.keys(this.tempPrescriptionList).length) {
        if (this.tempPrescriptionList.name
          && this.tempPrescriptionList.dose
          && this.tempPrescriptionList.duration) {
          // console.log(this.state.listOfMedicines)
          this.setState(prevState => ({
            listOfMedicines: [...prevState.listOfMedicines, { ...this.tempPrescriptionList }]
          }), () => {
            console.log(this.state.listOfMedicines)
            this.tempPrescriptionList = {}
            // console.log('list');
            // console.log([...this.state.listOfMedicines]);
            this.props.prescriptionChangeHandler(this.state.listOfMedicines, this.tempPrescriptionList)
          })
        }

        else {
          alert("Enter complete dose information!")
          this.tempPrescriptionList = {}
        }
      }
    }
    this.setState(prevState => ({
      showInput: !prevState.showInput
    }))
  }

  buttonElement = (
    <button className="add-drug-button btn" onClick={this, this.addNewDrugEvent}>
      Add
    </button>
  )

  inputElement = (
    <tr ref={node => this.node = node}>
      <td className="pt-3-half"><input type="text" name="name" onChange={this.onChangeHandlerPrescription} placeholder="Drug Name"></input></td>
      <td className="pt-3-half"><input type="text" name="dose" onChange={this.onChangeHandlerPrescription} placeholder="Dose"></input></td>
      <td className="pt-3-half"><input type="text" name="duration" onKeyDown={(event) => {
        if (event.keyCode === 13)
          this.addNewDrugEvent();
      }} onChange={this.onChangeHandlerPrescription} placeholder="Duration"></input></td>
      <td>
        <span className="table-remove">
          {this.buttonElement}
        </span>
      </td>

    </tr>
  )

  saveHandler = () => {
    // Save the list of medicines in the database
    console.log(this.state.listOfMedicines)
    if (this.props.patient.type === "New") {
      this.daywiseRef
        .collection("Reception")
        .doc(this.props.patient.adhaarid)
        .collection("Visits")
        .doc(this.today)
        .set({
          presciptions: this.state.listOfMedicines
        })
        .then(() => {
          alert("Successful")
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      this.daywiseRef
        .collection("Investigated")
        .doc(this.props.patient.adhaarid)
        .collection("Visits")
        .doc(this.today)
        .set({
          presciptions: this.state.listOfMedicines
        })
        .then(() => {
          alert("Successful")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  render() {
    console.log("Props")
    console.log(this.props)
    if (!this.isUpdated) {
      this.setState({
        listOfMedicines: this.props.prescriptionData
      })
      this.isUpdated = true
    }
    return (
      <div>
        <div className="card card-color" id="print-paper">
          <h3
            className="card-header card-header-color text-center font-weight-bold text-uppercase py-4 head-color"
          >Prescription</h3>
          <img src={RXImg} alt="RxImage" className="image-align" />
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
                        <td className="pt-3-half"
                          contentEditable="true" suppressContentEditableWarning={true}>{medicine.name}</td>
                        <td className="pt-3-half"
                          contentEditable="true" suppressContentEditableWarning={true}>{medicine.dose}</td>
                        <td className="pt-3-half"
                          contentEditable="true" suppressContentEditableWarning={true}>{medicine.duration}</td>
                        {this.state.showIcons === medicine ? <td className="icon-cell px-0" >

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
                  {this.state.showInput ? this.inputElement : null}
                </tbody>
              </table>
              <span className="table-add float-right right-shift ">
                {this.state.showInput ? null : this.buttonElement}
              </span>
            </div>
          </div>
        </div>
        <div className="buttons-align">
          <button className="btn btn-success align-save" onClick={this.saveHandler}>Save</button>
          
        </div>
      </div>
    );
  }
}
export default DosagePrescription;