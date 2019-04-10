import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import SaveChangesModal from 'form-builder/components/SaveChangesModal.jsx';

chai.use(chaiEnzyme());

describe('SaveChangesModal', () => {
  let wrapper;
  let closeSaveChangesModalSpy;
  let leavePageSpy;
  let event;

  beforeEach(() => {
    closeSaveChangesModalSpy = sinon.spy();
    event = { target: {} };
    leavePageSpy = sinon.spy();
    wrapper = mount(
      <SaveChangesModal
        closeSaveChangesModal={closeSaveChangesModalSpy}
        event={event}
        leavePage={leavePageSpy}
        showSaveChangesModal
      />
    );
  });

  it('should render save changes warning modal when showSaveChangesModal is true', () => {
    expect(wrapper.find('.dialog--container').text())
          .to.eql('You have unsaved changes. Please choose an action');
    expect(wrapper.find('.button-wrapper.fr .btn').text())
          .to.eql('Don\'t save');
    expect(wrapper.find('.button-wrapper.fr .button').text())
          .to.eql('Stay on page');
  });

  it('should not render save changes warning modal when showSaveChangesModal is false', () => {
    wrapper = shallow(
      <SaveChangesModal
        closeSaveChangesModal={closeSaveChangesModalSpy}
        event={event}
        leavePage={leavePageSpy}
        showSaveChangesModal={false}
      />
    );
    expect(wrapper).to.not.have.descendants('div');
  });

  it('should call close modal function when keycode is 27', () => {
    event = {
      preventDefault: () => {},
      keyCode: 27,
    };

    wrapper = shallow(
        <SaveChangesModal
          closeSaveChangesModal={closeSaveChangesModalSpy}
          event={event}
          leavePage={leavePageSpy}
          showSaveChangesModal
        />
    );

    wrapper.instance().handleEsc(event);

    sinon.assert.calledOnce(closeSaveChangesModalSpy);
  });

  it('should call close save changes modal and leave page when leavePage is called', () => {
    event = {
      preventDefault: () => {},
    };
    wrapper = shallow(
        <SaveChangesModal
          closeSaveChangesModal={closeSaveChangesModalSpy}
          event={event}
          leavePage={leavePageSpy}
          showSaveChangesModal
        />
    );

    wrapper.instance().leavePage(event);

    sinon.assert.calledOnce(leavePageSpy);
    sinon.assert.calledOnce(closeSaveChangesModalSpy);
  });

  it('should call close save changes modal when continueEditing is called', () => {
    event = {
      preventDefault: () => {},
    };
    wrapper = shallow(
        <SaveChangesModal
          closeSaveChangesModal={closeSaveChangesModalSpy}
          event={event}
          leavePage={leavePageSpy}
          showSaveChangesModal
        />
    );

    wrapper.instance().continueEditing(event);

    sinon.assert.calledOnce(closeSaveChangesModalSpy);
  });
});
