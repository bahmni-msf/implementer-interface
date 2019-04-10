import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formBuilderConstants } from '../constants';

export default class SaveChangesModal extends Component {

  constructor() {
    super();
    this.continueEditing = this.continueEditing.bind(this);
    this.leavePage = this.leavePage.bind(this);
  }

  handleEsc(e) {
    if (e.keyCode === 27) {
      this.props.closeSaveChangesModal();
    }
  }

  leavePage(e) {
    e.preventDefault();
    this.props.leavePage();
    this.props.closeSaveChangesModal();
  }

  continueEditing(e) {
    e.preventDefault();
    this.props.closeSaveChangesModal();
  }

  render() {
    if (this.props.showSaveChangesModal) {
      return (
        <div onKeyUp={(e) => this.handleEsc(e)}>
          <div className="dialog-wrapper" onClick={ this.props.closeSaveChangesModal }>
          </div>
          <div className="dialog dialog--no-header">
            <div className="dialog--container">
              { formBuilderConstants.dialogueMessages.saveChangesMessage.message }
            </div>
            <div className="button-wrapper fr">
              <button className="btn" onClick={ (e) => this.leavePage(e) } type="reset">
                { formBuilderConstants.dialogueMessages.saveChangesMessage.leavePage }
              </button>
              <button autoFocus className="button btn--highlight"
                onClick={ (e) => this.continueEditing(e) } type="submit"
              >
                { formBuilderConstants.dialogueMessages
                  .saveChangesMessage.continueEditing }
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

SaveChangesModal.propTypes = {
  closeSaveChangesModal: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  leavePage: PropTypes.func.isRequired,
  showSaveChangesModal: PropTypes.bool.isRequired,
};
