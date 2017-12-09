import { getAllApplications } from './jobApplications.jsx';

// takes request from view and formats before sending to store
// the request from view here will be a click to view kanban board
export const fetchUserApplications = ({ user }) => {
  type: 'FETCH_APPLICATIONS',
  getAllApplications()
};

export const showModal = ({ id }) => ({
  type: 'SHOW_MODAL',
  modalType: 'APPLICATION_DETAIL',
  modalProps: {
    applicationId: id
  }
});