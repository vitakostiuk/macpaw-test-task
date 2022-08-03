import * as api from 'services/api-cat';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect } from 'react';
import GalleryForm from './GalleryForm';
import { getBreedsOptions } from 'utils/breedsOptions';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import MainButton from 'components/common/MainButton';
import { ReactComponent as UploadBtn } from 'images/upload-16.svg';
import UploadImage from 'components/UploadImage';
import Loader from 'components/common/Loader';
import s from './Gallery.module.css';
import cssGrid from 'styles/cssGrid.module.css';

const Gallery = () => {
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [singleBreed, setSingleBreed] = useState([]);
  const [randomBreeds, setRandomBreeds] = useState([]);
  const [breed, setBreed] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        setIsLoading(true);
        setSingleBreed([]);

        // Update state --breedsOptions--
        let resultAll = await api.getData('/breeds');
        // console.log('resultAll', resultAll);
        setBreedsOptions(
          getBreedsOptions(resultAll, {
            label: 'None',
            value: 'None',
            id: '',
          }),
        );

        // Get first random render
        let firstRandonRender = await api.getData('/images/search', {
          params: { limit: 20 },
        });
        // console.log('firstRandonRender', firstRandonRender);
        setRandomBreeds(firstRandonRender);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBreeds();
  }, []);

  useEffect(() => {
    if (!breed) return;

    const getSingleBreedImages = async () => {
      try {
        setIsLoading(true);
        setRandomBreeds([]);
        setSingleBreed([]);

        // Find image id by name
        const findBreedByName = breedsOptions.find(
          option => option.label === breed,
        );
        const findedId = findBreedByName.id;
        console.log('findedId', findedId);

        // Get Single breed with options
        let singleBreed = await api.getData('/images/search', {
          params: { limit, breed_id: findedId, order, type },
        });
        // console.log('singleBreed', singleBreed);
        if (singleBreed.length === 0) {
          NotificationManager.warning(`There are not images!`);
          return setSingleBreed([]);
        }
        setSingleBreed(singleBreed);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getSingleBreedImages();
  }, [breed, breedsOptions, limit, order, type]);

  const addOptions = (breed, order, type, limit) => {
    setBreed(breed);
    setOrder(order);
    setType(type);
    setLimit(limit);
  };

  const toogleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleClickImage = () => {
    toogleModal();
  };

  return (
    <>
      <TemplatePage isLoading={isLoading}>
        <PageHeader text="GALLERY">
          <MainButton
            classNameBigBtn={s.BigLightButton}
            onClick={handleClickImage}
            classNameText={setBreedsOptions.BigLightBtnText}
            text="UPLOAD"
          >
            <UploadBtn className={s.Svg} />
          </MainButton>
        </PageHeader>

        <GalleryForm onSubmit={addOptions} breedsOptions={breedsOptions} />

        {isLoading && <Loader />}

        {showModal && <UploadImage onClose={toogleModal} />}

        {randomBreeds && !isLoading && (
          <ul className={cssGrid.GalleryWrap}>
            {randomBreeds.map(item => (
              <li key={item.id} className={cssGrid.GalleryItem}>
                {item ? (
                  <img src={item.url} alt={breed} className={cssGrid.Img} />
                ) : (
                  <div className={cssGrid.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}

        {singleBreed && !isLoading && (
          <ul className={cssGrid.GalleryWrap}>
            {singleBreed.map(item => (
              <li key={item.id} className={cssGrid.GalleryItem}>
                {item ? (
                  <img src={item.url} alt={breed} className={cssGrid.Img} />
                ) : (
                  <div className={cssGrid.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}
        <NotificationContainer />
      </TemplatePage>
    </>
  );
};

export default Gallery;
