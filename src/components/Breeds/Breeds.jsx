import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SortAB } from 'images/sort-20.svg';
import { ReactComponent as SortBA } from 'images/soft-revert-20.svg';
import { limitImg } from '../../data/options';
import { getBreedsOptions } from 'utils/breedsOptions';
import TemplatePage from 'components/common/TemplatePage';
import BreedGallery from './BreedGallery';
import BreedInfo from './BreedInfo';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import s from './Breeds.module.css';

const BreedsPage = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [breed, setBreed] = useState([]);
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [name, setName] = useState('All breeds');
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [typeOfSort, setTypeOfSort] = useState('ASC');
  const [isLoading, setIsLoading] = useState(false);
  const [isClickOnGalleryItem, setIsClickOnGalleryItem] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);

  axios.defaults.headers.common['x-api-key'] =
    'b1dfeea4-d632-4776-b494-723bac3c8eb2';

  // ---- GET ALL BREEDS
  useEffect(() => {
    if (name !== 'All breeds') {
      return;
    }

    const getAllBreeds = async () => {
      try {
        setHiddenBtn(true);
        setIsLoading(true);

        // Update state --breedsOptions--
        let resultAll = await axios.get('https://api.thecatapi.com/v1/breeds');
        console.log('breedsOptions', resultAll.data);
        setBreedsOptions(
          getBreedsOptions(resultAll.data, {
            label: 'All breeds',
            value: 'All breeds',
            id: '',
          }),
        );

        setAllBreeds([]);
        // Update state --allBreeds-- and render all breeds
        let { data } = await axios.get('https://api.thecatapi.com/v1/breeds', {
          params: { limit, page, order: typeOfSort },
        });
        console.log('allBreeds', data);
        if (data.length === 0) {
          setHiddenBtn(false);
          NotificationManager.warning(`There are not images!`);
          return setAllBreeds([]);
        }

        data.map(({ name, id, image }) =>
          setAllBreeds(prevAllBreeds => [
            ...prevAllBreeds,
            { name, id, image },
          ]),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setHiddenBtn(false);
      }
    };
    getAllBreeds();
  }, [limit, name, page, typeOfSort]);

  // ---- GET ONE BREED
  useEffect(() => {
    if (name === 'All breeds') {
      setBreed([]);
      return;
    }

    const getBreed = async () => {
      try {
        setHiddenBtn(true);
        setAllBreeds([]);
        setIsLoading(true);

        // Find image id by name
        const findBreedByName = breedsOptions.find(
          breed => breed.label === name,
        );
        const findedId = findBreedByName.id;
        console.log('findedId', findedId);

        // Update state --breed-- and render one breed's images
        setBreed([]);
        //////////
        let { data } = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          {
            params: { limit, breed_id: findedId },
          },
        );
        console.log('data for single breed', data);
        if (data.length === 0) {
          NotificationManager.warning(`There are not already images!`);
          return setBreed([]);
        }
        setBreed(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setHiddenBtn(true);
      }
    };
    getBreed();
  }, [breedsOptions, limit, name]);

  // Update state --page--
  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const decrementPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  // Update state --name--
  const handleChange = e => {
    if (e.target.name === 'breed') {
      setName(e.target.value);
    }
    if (e.target.name === 'limit') {
      setLimit(e.target.value);
    }
  };

  const handleClickOnGalleryItem = () => {
    setIsClickOnGalleryItem(true);
    setHiddenBtn(true);
  };

  const handleClickBreeds = () => {
    setName('All breeds');
  };

  return (
    <>
      <TemplatePage isLoading={isLoading}>
        {!isClickOnGalleryItem && (
          <PageHeader text="BREEDS" onClick={handleClickBreeds}>
            <select
              name="breed"
              onChange={handleChange}
              className={s.SelectName}
            >
              {breedsOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              name="limit"
              onChange={handleChange}
              className={s.SelectLimit}
            >
              {limitImg.map(({ value, label }) => (
                <option key={value} value={value}>
                  {`Limit: ${label}`}
                </option>
              ))}
            </select>
            {name === 'All breeds' && (
              <>
                <button
                  type="button"
                  className={s.SortBtn}
                  onClick={() => setTypeOfSort('DESC')}
                >
                  <SortAB className={s.Letter} />
                </button>
                <button
                  type="button"
                  className={s.SortBtn}
                  onClick={() => setTypeOfSort('ASC')}
                >
                  <SortBA className={s.Letter} />
                </button>
              </>
            )}
          </PageHeader>
        )}

        {isLoading && <Loader />}

        {breed && !isLoading && <BreedGallery name={name} breed={breed} />}

        {allBreeds && !isLoading && !isClickOnGalleryItem && (
          <>
            <ul className={s.GalleryWrap}>
              {allBreeds.map(({ name, id, image }) => (
                <li
                  key={id}
                  className={s.GalleryItem}
                  onClick={handleClickOnGalleryItem}
                >
                  {image ? (
                    <Link to={`${id}`}>
                      <img src={image.url} alt="cat" className={s.Img} />
                      <div className={s.After}>
                        <button className={s.Name}>{name}</button>
                      </div>
                    </Link>
                  ) : (
                    <div className={s.ImgNotFound}>Image not found</div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {isClickOnGalleryItem && <BreedInfo />}

        {!hiddenBtn && (
          <div className={s.RouteBtnWrapper}>
            <button
              type="button"
              className={s.PrevievBtn}
              onClick={decrementPage}
            >
              &#10095; &#160;Previev
            </button>
            <button type="button" className={s.NextBtn} onClick={incrementPage}>
              Next&#160; &#10094;
            </button>
          </div>
        )}
        <NotificationContainer />
      </TemplatePage>
    </>
  );
};

export default BreedsPage;
