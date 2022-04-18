import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setChangedProperty } from 'form-builder/actions/control';

export class FormPrivilegesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formPrivileges: {},
    };
  }

  componentWillUpdate(newProps) {
  }
  updateProperty() {
    let properties = { [this.props.eventProperty]: true };
    if (this.props.onEventLoad) {
      try {
        this.props.onEventLoad();
      } catch (e) {
        properties = { [this.props.eventProperty]: false };
      }
    }
    this.props.dispatch(setChangedProperty(properties));
  }
  render() {
    const name = this.props.label;
    return (
      <div className="form-privileges-container">
        <label>{'Manage Privileges'}</label>
        <button onClick={() => this.updateProperty()}>
          <i aria-hidden="true" className="fa fa-code" />
        </button>
      </div>
    );
  }
}

FormPrivilegesContainer.propTypes = {
  dispatch: PropTypes.func,
  eventProperty: PropTypes.string,
  formPrivilege: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isEditable: PropTypes.bool,
    isViewable: PropTypes.bool,
  }),
  formPrivileges: PropTypes.Array,
  onEventLoad: PropTypes.func,
};

const mapStateToProps = (state) => ({
  formPrivileges: state.formPrivileges,
});
export default connect(mapStateToProps)(FormPrivilegesContainer);
