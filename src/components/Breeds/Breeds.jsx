import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import { ReactComponent as SortAB } from 'images/sort-20.svg';
import { ReactComponent as SortBA } from 'images/soft-revert-20.svg';
import { limitImg } from '../../data/options';
import { getBreedsOptions } from 'utils/breedsOptions';
import Header from '../Header';
// import * as api from '../../services/api-cat';
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
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [query, setQuery] = useState('');
  const [resultByquery, setResultByquery] = useState({});

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
        console.log('resultAll', resultAll.data);
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
        console.log('data', data);
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

        // Search by name
        if (query) {
          setAllBreeds([]);
          setBreed([]);
          let queryResult = await axios.get(
            'https://api.thecatapi.com/v1/images/search',
            {
              params: { q: query },
            },
          );
          console.log('queryResult', queryResult.data);
          setResultByquery(queryResult.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setHiddenBtn(false);
      }
    };
    getAllBreeds();
  }, [limit, name, page, query, typeOfSort]);

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

  const handleSearchbarSubmit = name => {
    setQuery(name);
  };

  return (
    <>
      <Header handleSearchbarSubmit={handleSearchbarSubmit} />
      <div className={s.Paper}>
        <div className={s.BtnWrapper}>
          <button type="button" className={s.LeftArrowBtn}>
            <ArrowLeftBtn />
          </button>
          <button
            type="button"
            onClick={() => setName('All breeds')}
            className={s.BigButton}
          >
            BREEDS
          </button>
          <select name="breed" onChange={handleChange} className={s.SelectName}>
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
        </div>
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

        {query && (
          <div className={s.ImgWrapper}>
            <img src={resultByquery.url} alt="cat" className={s.Img} />
          </div>
        )}

        {breed && (
          <ul className={s.GalleryWrap}>
            {breed.map(({ id, url }) => (
              <li key={id} className={s.GalleryItem}>
                <img src={url} alt={name} className={s.Img} />
              </li>
            ))}
          </ul>
        )}

        {allBreeds && (
          <ul className={s.GalleryWrap}>
            {allBreeds.map(({ name, id, image }) => (
              <li key={id} className={s.GalleryItem}>
                {image ? (
                  <img src={image.url} alt="cat" className={s.Img} />
                ) : (
                  <div className={s.ImgNotFound}>Image not found</div>
                )}
                <div className={s.After}>
                  <button className={s.Name}>{name}</button>
                </div>
              </li>
            ))}
          </ul>
        )}

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
      </div>
    </>
  );
};

export default BreedsPage;
