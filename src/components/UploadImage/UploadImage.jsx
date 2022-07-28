import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import UploadImageForm from './UpoadImageForm';

const UploadImage = ({ onClose }) => {
  return (
    <>
      <Modal onClose={onClose}>
        <UploadImageForm />
      </Modal>
    </>
  );
};

UploadImage.propTypes = {
  onClose: PropTypes.func,
};

export default UploadImage;
