import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormPrivilegesPreviewGrid from 'form-builder/components/FormPrivilegesPreviewGrid.jsx';
import FormBuilderBreadcrumbs from 'form-builder/components/FormBuilderBreadcrumbs.jsx';
import FormBuilderHeader from 'form-builder/components/FormBuilderHeader.jsx';
import NotificationContainer from 'common/Notification';

class FormPrivilegesPreviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { formPrivileges: {}, notification: {}, loading: true };
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    const { formPrivileges } = this.state;
    return (<div>
      <NotificationContainer
        notification={this.state.notification}
      />
      <FormBuilderHeader />
      <div className="breadcrumb-wrap">
        <div className="breadcrumb-inner">
          <div className="fl">
            <FormBuilderBreadcrumbs match={this.props.match} routes={this.props.routes} />
          </div>
        </div>
      </div>
      <div className="container-content-wrap">
        <div className="info-view-mode-wrap">
          <div className="info-view-mode">
            <i className="fa fa-info-circle fl"></i>
          </div>
        </div>
         <FormPrivilegesPreviewGrid formUuid={ this.props.match.params.formUuid } />
      </div>
    </div>);
  }
}
FormPrivilegesPreviewContainer.propTypes = {
  formUuid: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  formUuid: state.formUuid,
});
export default connect(mapStateToProps)(FormPrivilegesPreviewContainer);

