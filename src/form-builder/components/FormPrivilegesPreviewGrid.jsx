import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { httpInterceptor } from 'common/utils/httpInterceptor';
import Select from 'react-select';
import { formBuilderConstants } from 'form-builder/constants';

export default class FormPrivilegesPreviewGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formPrivileges: {},
      searchDisabled: false,
      availablePrivileges: [],
    };
  }

  componentWillMount() {
    this.fetchFormPrivilegesFromDB();
    this.fetchPrivileges();
  }
  componentDidMount() {
  }
  fetchFormPrivilegesFromDB() {
    const initialPrivileges = [];
    const formUuid = this.props.formUuid;

    const optionsUrl = `${formBuilderConstants.getFormPrivilegesFromUuidUrl}?formUuid=${formUuid}`;
    httpInterceptor.get(optionsUrl)
        .then((initialPrivilegesFromDB) => {
          initialPrivilegesFromDB.forEach((privilege, key) => {
            initialPrivileges.push(privilege);
          });
          this.setState({ formPrivileges: (initialPrivileges), loading: false });
        });
  }
  fetchPrivileges() {
    const queryParams = '?=';
    const optionsUrl = `${formBuilderConstants.formPrivilegeUrl}${queryParams}`;
    httpInterceptor.get(optionsUrl)
        .then((initialPrivileges) => {
          this.setState(
            { availablePrivileges: this.orderFormByVersion(initialPrivileges.results),
              loading: false,
            });
        });
  }
  orderFormByVersion(privilege) {
    const sampleList = [];
    privilege.forEach((privilege) => {
      const item = {
        value: privilege.display,
        uuid: privilege.uuid,
        label: privilege.display,
      };
      sampleList.push(item);
    });
    return sampleList;
  }
  getValue(privilege) {
    if (privilege !== undefined && privilege.privilegeName === '') {
      const selectedPrivilegeOption = 'Select a privilege';
      return (selectedPrivilegeOption);
    } return privilege.privilegeName;
  }
  render() {
    const { availablePrivileges } = this.state;
    if (this.state.formPrivileges.map === undefined) {
      return null;
    }

    return (
        <div className="translations-table-container">
          <table className="form-privilege-table">
            <thead>
            <tr>
              <th> Privilege</th>
              <th> isEditable</th>
              <th> isViewable</th>

            </tr>
            </thead>
            <tbody>
            {this.state.formPrivileges.map((privilege, idx) => (

                <tr id="addr0" key={idx}>
                  <td>
                    <Select
                      disabled="true"
                      onChange={(e) => this.handleTag(e, idx)}
                      options={availablePrivileges}
                      value={this.getValue(privilege)}
                    />
                  </td>
                  <td>
                    <input
                      checked={privilege.editable}
                      className="form-control"
                      defaultChecked={privilege.editable}
                      disabled="true"
                      name="isEditable"
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={privilege.viewable}
                      className="form-control"
                      defaultChecked={privilege.viewable}
                      disabled="true"
                      name="isViewable"
                      type="checkbox"
                    />
                  </td>

                </tr>
            ))}
            </tbody>
          </table>
        </div>
    );
  }
}
FormPrivilegesPreviewGrid.propTypes = {
  formUuid: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  formUuid: state.formUuid,
});
