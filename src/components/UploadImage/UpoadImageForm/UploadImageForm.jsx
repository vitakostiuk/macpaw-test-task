import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as UploadSkeleton } from 'images/upload-bg.svg';
import s from './UploadImageForm.module.css';

axios.defaults.headers.common['x-api-key'] =
  'b1dfeea4-d632-4776-b494-723bac3c8eb2';

const UploadImageForm = () => {
  // const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uloadedImage, setUloadedImage] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const uploadImg = async () => {
      // setUploading(true);
      let formData = new FormData();
      formData.append('file', selectedFile);
      console.log(formData);

      try {
        const response = await axios.post(
          'https://api.thecatapi.com/v1/images/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        setUloadedImage(response.data);
        console.log('response.data', response.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        // setUploading(false);
        setSelectedFile(null);
      }
    };
    uploadImg();
  }, [selectedFile]);

  const onFileChange = e => {
    setSelectedFile(e.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <>
          <p className={s.StatusUpload}>Image File Name: {selectedFile.name}</p>
          <button type="button" className={s.UploadPhotoBtn}>
            UPLOAD PHOTO
          </button>
        </>
      );
    } else {
      return <p className={s.StatusUpload}>No file selected</p>;
    }
  };

  return (
    <>
      <h1 className={s.Title}>Upload a .jpg or .png Cat Image</h1>
      <h2 className={s.SubTitle}>
        Any uploads must comply with the{' '}
        <a
          href="https://thecatapi.com/privacy"
          target="_blank"
          rel="noreferrer"
          className={s.SubTitleLink}
        >
          upload guidelines
        </a>{' '}
        or face deletion.
      </h2>

      {/* {uloadedImage && (
        <div className={s.InputContainer}>
          {' '}
          <div className={s.InputContainer}>
            <img src={uloadedImage.url} alt={uloadedImage.original_filename} />
          </div>
        </div>
      )} */}

      <div className={s.InputContainer}>
        <input
          type="file"
          id="inputFile"
          className={s.Input}
          onChange={onFileChange}
        />
        <label htmlFor="inputFile" className={s.InputFileLabel}>
          <span className={s.InputFileLabelIconWrapper}>
            <UploadSkeleton className={s.Skeleton} />
          </span>
          <p className={s.TextOverSceleton}>
            <span className={s.TextOverSceletonStrong}>Drag here </span>your
            file or{' '}
            <span className={s.TextOverSceletonStrong}>Click here </span>to
            upload
          </p>
        </label>
      </div>
      {fileData()}
    </>
  );
};

export default UploadImageForm;

// <p>No file selected</p>
// <button>UPLOAD PHOTO</button>
// <div>
//   <p>Thanks for the Upload - Cat found!</p>
// </div>
// <div>
//   <p>No Cat found - try a different one</p>
// </div>
