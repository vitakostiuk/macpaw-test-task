import * as api from 'services/api-cat';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import { ReactComponent as FavouritesIcon } from 'images/fav-20.svg';
import cssGrid from 'styles/cssGrid.module.css';
import css from 'styles/itemNotFound.module.css';
import s from 'components/UserActionLogs/UserActionLogs.module.css';
import { getTime } from 'utils/getTime';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [deleteFavourite, setDeleteFavourite] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isClickImg, setIsClickImg] = useState(false);
  const [imgId, setImgId] = useState('');

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getFavourites = async () => {
      try {
        setIsLoading(true);

        // Get all favourites votes
        const allFavourites = await api.getData('/favourites', {
          params: { sub_id: 'User-123' },
        });
        console.log('allFavourites', allFavourites);
        setFavourites(allFavourites);

        // Delete vote
        if (isClickImg) {
          const dataForDelete = allFavourites.find(vote => vote.id === imgId);
          console.log('dataForDelete', dataForDelete);

          const deleteVote = await api.deleteVote(
            '/favourites',
            dataForDelete.id,
          );
          setDeleteFavourite(dataForDelete);
          console.log('deleteVote', deleteVote);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsClickImg(false);
      }
    };
    getFavourites();
  }, [imgId, isClickImg]);

  const handleClickImg = id => {
    setIsClickImg(true);
    setImgId(id);
  };

  return (
    <>
      <TemplatePage>
        <PageHeader text="FAVOURITES" />
        {isLoading && <Loader />}

        {favourites && !isLoading && (
          <ul className={cssGrid.GalleryWrap}>
            {favourites.map(item => (
              <li
                key={item.id}
                className={cssGrid.GalleryItem}
                onClick={() => handleClickImg(item.id)}
              >
                {item ? (
                  <>
                    <img
                      src={item.image.url}
                      alt="favourites"
                      className={cssGrid.Img}
                    />
                    <div className={cssGrid.After}>
                      <div
                        className={
                          theme === themes.light
                            ? cssGrid.IconContainer
                            : cssGrid.IconContainerDark
                        }
                      >
                        <FavouritesIcon />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={cssGrid.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}

        {deleteFavourite.created_at &&
          deleteFavourite.id &&
          favourites.length > 0 && (
            <div
              className={
                theme === themes.light ? s.ActionItem : s.ActionItemDark
              }
            >
              <span className={theme === themes.light ? s.Time : s.TimeDark}>
                {getTime(deleteFavourite.created_at)}
              </span>
              <p className={s.Text}>
                Image ID:{' '}
                <span className={theme === themes.light ? s.Id : s.IdDark}>
                  {deleteFavourite.id}
                </span>{' '}
                was removed from Favourites
              </p>
            </div>
          )}

        {favourites.length === 0 && !isLoading && (
          <div
            className={theme === themes.light ? css.TextWrap : css.TextWrapDark}
          >
            <p className={css.ItemNotFound}>No item found</p>
          </div>
        )}
      </TemplatePage>
    </>
  );
};

export default Favourites;
