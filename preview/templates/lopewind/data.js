import { truncate } from 'lodash';
import moment from 'moment';
import { calTermDate } from '../../../helpers/date';


function getTplData(props) {

  moment.locale(props.configs.language);

  const t = function t(id) {
    return props.t(id, { lng: props.configs.language });
  };
  const formatDate = function getDate(date) {
    return moment(date).format(props.configs.dateFormat);
  };

  const tplData = {
    company: props.profile.company,
    fullname: props.profile.fullname,
    address: props.profile.address,
    email: props.profile.email,
    phone: props.profile.phone,

    logoSrc: props.profile.logo,

    mainHeading: t('preview:common:invoice'),
    creationDate: t('preview:common:created') + ' ' + formatDate(props.invoice.created_at),

    recipientTitle: t('preview:common:billedTo'),
    recipientCompany: props.invoice.recipient.company,
    recipientFullname: props.invoice.recipient.fullname,
    recipientEmail: props.invoice.recipient.email,
    recipientPhone: props.invoice.recipient.phone,

    noteHeading: t('preview:common:notice'),
    note: props.invoice.note,

    invoiceId: props.invoice.invoiceID ?
      props.invoice.invoiceID :
      truncate(props.invoice._id, {
        length: 8,
        omission: '',
      }),

    showLogo: props.configs.showLogo,
    showRecipient: props.configs.showRecipient,
    showDueDate: props.invoice.dueDate,
    showDueDateNote: !props.invoice.dueDate.useCustom,
    showNote: props.invoice.note
  };

  if (tplData.showDueDate) {
    const dueDateValue = props.invoice.dueDate.useCustom ?
      props.invoice.dueDate.selectedDate :
      calTermDate(props.invoice.created_at, props.invoice.dueDate.paymentTerm);
    tplData.dueDate = t('preview:common:due') + ' ' + formatDate(dueDateValue);
  }

  if (tplData.showDueDateNote) {
    const paymentTerm = props.invoice.dueDate.paymentTerm;
    tplData.dueDateNote = t(`form:fields:dueDate:paymentTerms:${paymentTerm}:description`);
  }

  // css vars
  tplData.cssVars = {};
  if(props.configs.accentColor.useCustom)
    tplData.cssVars['--accent-color'] = props.configs.accentColor.color;

  return tplData;
};

export default getTplData;
