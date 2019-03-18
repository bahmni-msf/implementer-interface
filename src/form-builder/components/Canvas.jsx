import React, { Component } from 'react';
import PropTypes from 'prop-types';
import each from 'lodash/each';
import { connect } from 'react-redux';
import { blurControl, deselectControl } from 'form-builder/actions/control';
import ControlWrapper from 'form-builder/components/ControlReduxWrapper.jsx';
import { GridDesigner as Grid } from 'bahmni-form-controls';
import { ComponentStore } from 'bahmni-form-controls';
import TitleDetail from './TitleDetail';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.components = {};
    this.clearSelectedControl = this.clearSelectedControl.bind(this);
    this.state = { descriptors: this.getComponentDescriptors(props.formResourceControls),
      formName: props.formName, isBeingDragged:false };
    this.gridReference = this.gridReference.bind(this);
    this.gridRef = undefined;
    this.handleControlDrop= this.handleControlDrop.bind(this);
  }

  getComponentDescriptors(formResourceControls) {
    const descriptors = [];
    each(formResourceControls, control => {
      const designerComponentDescriptor = ComponentStore.getDesignerComponent(control.type);
      if (designerComponentDescriptor) {
        const descriptorClone = Object.assign({}, designerComponentDescriptor);
        descriptorClone.metadata = control;
        descriptors.push(descriptorClone);
      }
    });
    return descriptors;
  }

  clearSelectedControl() {
    this.props.dispatch(deselectControl());
    this.props.dispatch(blurControl());
  }

  prepareJson() {
    const controls = this.gridRef.getControls();
    return {
      name: this.props.formName,
      id: this.props.formId,
      uuid: this.props.formUuid,
      defaultLocale: this.props.defaultLocale,
      controls,
    };
  }

  gridReference(ref) {
    if (ref) {
      this.gridRef = ref;
    }
  }

  updateFormName(value) {
    const newName = this.props.updateFormName(value);
    if (newName.length > 0) {
      this.setState({ formName: newName });
    }
  }

  handleControlDrop(metadata, cellMetadata, successCallback, dropCell){
    console.log('called handleControlDrop', metadata, cellMetadata)
    if(!this.dragAndDropLocationIsSame(this.props.dragSourceCell, dropCell) && cellMetadata.length === 0){
      this.props.dragSourceCell.processMove && this.props.dragSourceCell.processMove(metadata)
      successCallback(metadata);
    }
    else{
      this.props.dragSourceCell.updateMetadata(metadata)
    }
  }

  dragAndDropLocationIsSame(dragCell, dropCell){
    return dragCell === dropCell
  }

  render() {
    const { formResourceControls } = this.props;
    return (
      <div
        className="form-builder-canvas"
        onClick={this.clearSelectedControl}
      >
        <div className="canvas-placeholder">Drag & Drop controls to create a form</div>
        <div className="canvas-title">
          <TitleDetail
            updateValue={(value) => this.updateFormName(value)}
            validateNameLength = {this.props.validateNameLength}
            value={this.state.formName}
          />
        </div>
        <Grid
          className="bahmni-grid"
          controls={ formResourceControls || [] }
          idGenerator={ this.props.idGenerator }
          ref={ this.gridReference }
          setError={this.props.setError}
          showDeleteButton
          wrapper={ ControlWrapper }
          dragSourceCell={this.props.dragSourceCell}
          onControlDrop={this.handleControlDrop}
          isBeingDragged= {this.state.isBeingDragged}
        />
      </div>
    );
  }
}

Canvas.propTypes = {
  defaultLocale: PropTypes.string,
  dispatch: PropTypes.func,
  formId: PropTypes.number,
  formName: PropTypes.string.isRequired,
  formResourceControls: PropTypes.array.isRequired,
  formUuid: PropTypes.string.isRequired,
  idGenerator: PropTypes.object.isRequired,
  setError: PropTypes.func,
  updateFormName: PropTypes.func,
  validateNameLength: PropTypes.func,
};
function mapStateToProps(state) {
  return {
    dragSourceCell : state.controlDetails.dragSourceCell
  };
}
export default connect(mapStateToProps, null, null, { withRef: true })(Canvas);
