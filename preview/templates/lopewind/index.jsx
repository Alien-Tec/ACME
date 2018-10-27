// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import Main from './components/Main';

// tpl data helper
import getTplData from './data';

// css
import styles from './template.scss';

// Component
function Lopewind(props) {

  const tpl = getTplData(props);

  return (
    <section className="invoice" style={tpl.cssVars}>
      <style>{styles}</style>

      {tpl.showLogo && (
        <div className="invoice-logo">
          <img src={tpl.logoSrc} alt="Logo" />
        </div>
      )}

      <header className="invoice-header">
        <div className="left-column">
          <div className="company">
            <h4>{tpl.company}</h4>
            <p>{tpl.fullname}</p>
            <p>{tpl.address}</p>
            <p>{tpl.email}</p>
            <p>{tpl.phone}</p>
          </div>
          {tpl.showRecipient && (
            <div className="recipient">
              <h4>{tpl.recipientTitle}</h4>
              <p>{tpl.recipientCompany}</p>
              <p>{tpl.recipientFullname}</p>
              <p>{tpl.recipientEmail}</p>
              <p>{tpl.recipientPhone}</p>
            </div>
          )}
        </div>
        <div className="right-column">
          <h1 className="heading">{tpl.mainHeading}</h1>
          <p>#{tpl.invoiceId}</p>
          <p>{tpl.creationDate}</p>
          {tpl.showDueDate && [
            <p key="dueDate">{tpl.dueDate}</p>,
            <p key="dueDateNote">{tpl.showDueDateNote && `(${tpl.dueDateNote})`}</p>,
          ]}
        </div>
      </header>


      <Main {...props} />


      {tpl.showNote && (
        <footer className="invoice-footer">
          <h4>{tpl.noteHeading}</h4>
          <p>{tpl.note}</p>
        </footer>
      )}
    </section>
  );
}

Lopewind.propTypes = {
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default Lopewind;
