import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import GalleryForm from './GalleryForm';
import { getBreedsOptions } from 'utils/breedsOptions';
import Header from '../Header';
import s from '../Breeds/Breeds.module.css';

const GalleryPage = () => {
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [singleBreed, setSingleBreed] = useState([]);
  const [randomBreeds, setRandomBreeds] = useState([]);
  const [breed, setBreed] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [resultByquery, setResultByquery] = useState({});

  axios.defaults.headers.common['x-api-key'] =
    'b1dfeea4-d632-4776-b494-723bac3c8eb2';

  useEffect(() => {
    const getBreeds = async () => {
      try {
        setIsLoading(true);
        setSingleBreed([]);

        // Update state --breedsOptions--
        let { data } = await axios.get('https://api.thecatapi.com/v1/breeds');
        console.log('data breedsOptions', data);
        setBreedsOptions(
          getBreedsOptions(data, {
            label: 'None',
            value: 'None',
            id: '',
          }),
        );

        // Get first random render
        let result = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          {
            params: { limit: 20 },
          },
        );
        console.log('result', result);
        setRandomBreeds(result.data);

        // Search by name
        if (query) {
          setSingleBreed([]);
          setRandomBreeds([]);
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
      }
    };
    getBreeds();
  }, [query]);

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
        let { data } = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          {
            params: { limit, breed_id: findedId, order, type },
          },
        );
        console.log('data Single breed', data);
        if (data.length === 0) {
          NotificationManager.warning(`There are not images!`);
          return setSingleBreed([]);
        }
        setSingleBreed(data);
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

  const handleSearchbarSubmit = name => {
    setQuery(name);
  };

  return (
    <>
      {' '}
      <Header handleSearchbarSubmit={handleSearchbarSubmit} />
      <div className={s.Paper}>
        <div className={s.BtnWrapper}>
          <button type="button" className={s.LeftArrowBtn}>
            <ArrowLeftBtn />
          </button>
          <button type="button" className={s.BigButton}>
            GALLERY
          </button>
        </div>
        <GalleryForm onSubmit={addOptions} breedsOptions={breedsOptions} />
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

        {randomBreeds && (
          <ul className={s.GalleryWrap}>
            {randomBreeds.map(item => (
              <li key={item.id} className={s.GalleryItem}>
                {item ? (
                  <img src={item.url} alt={breed} className={s.Img} />
                ) : (
                  <div className={s.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}

        {singleBreed && (
          <ul className={s.GalleryWrap}>
            {singleBreed.map(item => (
              <li key={item.id} className={s.GalleryItem}>
                {item ? (
                  <img src={item.url} alt={breed} className={s.Img} />
                ) : (
                  <div className={s.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}
        <NotificationContainer />
      </div>
    </>
  );
};

export default GalleryPage;
