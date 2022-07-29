import { useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { ReactComponent as UploadSkeleton } from 'images/upload-bg.svg';
import { ReactComponent as Success } from 'images/success-20.svg';
import { ReactComponent as Error } from 'images/error-20.svg';
import noCatFoundImg from 'images/dog-puppy-on-garden-royalty-free-image-1586966191 1.png';
import s from './UploadImageForm.module.css';

axios.defaults.headers.common['x-api-key'] =
  'b1dfeea4-d632-4776-b494-723bac3c8eb2';

const UploadImageForm = () => {
  const [isClickUploadPhoto, setIsClickUploadPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFile) return;

    if (selectedFile) {
      setIsLoading(true);
    }

    const uploadImg = async () => {
      let formData = new FormData();
      formData.append('file', selectedFile);

      try {
        if (!formData) return;

        const response = await axios.post(
          'https://api.thecatapi.com/v1/images/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        setUploadedImage(response.data);
        console.log('response.data', response.data);

        if (isClickUploadPhoto) {
          setSelectedFile(null);
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    uploadImg();
  }, [isClickUploadPhoto, selectedFile]);

  const onFileChange = e => {
    setSelectedFile(e.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <>
          {isLoading && (
            <div className={s.Loader}>
              <BallTriangle
                height="70"
                width="70"
                color="#ff868e"
                ariaLabel="loading"
              />
            </div>
          )}

          {!isLoading && (
            <div className={s.SkeletonWrapper}>
              <img
                src={uploadedImage.url}
                alt={uploadedImage.original_filename}
                className={s.UploadedPhoto}
              />
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <input
            type="file"
            id="inputFile"
            className={s.Input}
            onChange={onFileChange}
          />
          <label htmlFor="inputFile" className={s.InputFileLabel}>
            <span className={s.SkeletonWrapper}>
              <UploadSkeleton className={s.Skeleton} />
            </span>
            <p className={s.TextOverSceleton}>
              <span className={s.TextOverSceletonStrong}>Drag here </span>your
              file or{' '}
              <span className={s.TextOverSceletonStrong}>Click here </span>to
              upload
            </p>
          </label>
        </>
      );
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

      {error && (
        <div className={s.ErrorContainer}>
          {' '}
          <div className={s.SkeletonWrapper}>
            <img src={noCatFoundImg} alt="No cat found" />
          </div>
        </div>
      )}

      {!error && <div className={s.InputContainer}>{fileData()}</div>}

      {!selectedFile && !error && (
        <p className={s.StatusUpload}>No file selected</p>
      )}

      {selectedFile && !error && (
        <>
          <p className={s.StatusUpload}>Image File Name: {selectedFile.name}</p>
          <button
            type="button"
            className={s.UploadPhotoBtn}
            onClick={() => setIsClickUploadPhoto(true)}
          >
            UPLOAD PHOTO
          </button>
        </>
      )}

      {error && (
        <>
          {' '}
          <p className={s.StatusUpload}>Image File Name: {selectedFile.name}</p>
          <div className={s.StatusUploadWrap}>
            <Error className={s.StatusIcon} />
            <p className={s.StatusError}>No Cat found - try a different one</p>
          </div>
        </>
      )}

      {isClickUploadPhoto && !selectedFile && (
        <div className={s.StatusUploadWrap}>
          <Success className={s.StatusIcon} />
          <p className={s.StatusSuccess}>Thanks for the Upload - Cat found!</p>
        </div>
      )}
    </>
  );
};

export default UploadImageForm;
