import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as api from '../../services/api-cat';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import css from './Search.module.css';
import s from '../Breeds/Breeds.module.css';

const Search = () => {
  const [resultByQuery, setResultByQuery] = useState({});
  const [resultById, setResultById] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    const getByQuery = async () => {
      try {
        setIsLoading(true);

        // Get result by search query
        if (state.query) {
          let queryResult = await api.getData('/breeds/search', {
            params: { q: state.query },
          });
          // console.log('queryResult', queryResult);
          if (queryResult.length === 0) {
            setResultByQuery({});
            setResultById([]);
            NotificationManager.warning(`There are not images for such name!`);
            return;
          }

          setResultByQuery(queryResult[0]);
        }

        // Get result by breed id
        let resultById = await api.getData('/images/search', {
          params: { breed_id: resultByQuery.id, limit: 5 },
        });
        // console.log('resultById', resultById);
        setResultById(resultById);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getByQuery();
  }, [resultByQuery.id, state.query]);

  return (
    <>
      <TemplatePage isLoading={isLoading}>
        <PageHeader text="SEARCH" />
        {isLoading && <Loader />}
        {resultById && !isLoading && (
          <div className={css.ResultWrapper}>
            <p className={css.Text}>
              Search results for:{' '}
              <span className={css.BoldText}>{resultByQuery.name}</span>
            </p>

            <ul className={s.GalleryWrap}>
              {resultById.map(item => (
                <li key={item.id} className={s.GalleryItem}>
                  {item ? (
                    <img src={item.url} alt={state.query} className={s.Img} />
                  ) : (
                    <div className={s.ImgNotFound}>Image not found</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <NotificationContainer />
      </TemplatePage>
    </>
  );
};

export default Search;
