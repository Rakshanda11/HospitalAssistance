import React from 'react';
import './DosagePrescription.css';
class DosagePrescription extends React.Component{
    render(){
        return(
            
<div class="card card-color">
  <h3 class="card-header card-header-color text-center font-weight-bold text-uppercase py-4 head-color">Prescription</h3>
  <div class="card-body">
    <div id="table" className="table-editable">
      <span class="table-add float-right right-shift ">
        <a  class="text-success">
          <i class="fa fa-plus fa-lg" >
            Add
          </i>
        </a>
      </span>
      <table class="table table-bordered table-responsive-md  text-center">
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Dose</th>
            <th class="text-center">Duration</th>
            <th className="text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="pt-3-half" contenteditable="true">Aurelia Vega</td>
            <td class="pt-3-half" contenteditable="true">30</td>
            <td class="pt-3-half" contenteditable="true">Depends</td>
            <td>
              <span class="table-remove"><button type="button"
                  class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

        );
    }
}
export default DosagePrescription;