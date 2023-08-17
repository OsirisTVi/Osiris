import { useSelector } from 'react-redux'
import { FilmsRetrieveThunk } from '../../store/filmThunk/FilmsRetrieve.thunk'
import { useDispatch } from 'react-redux'
import styles from './MainPage.module.css'




function MainPage() {


    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const { filmObjects } = useSelector(state=> state.film)



    const genresList = [
      { id: 2, name: 'Drama' },
      { id: 8, name: 'Science Fiction' },

    ];
    
    const countriesList = [
      { id: 2, name: 'Германия' },
      { id: 3, name: 'США' },
      { id: 4, name: 'Великобритания'},
      { id: 5, name: 'Канада'}

    ];



    const getCountryNameById = (countryId) => {
      const country = countriesList.find((c) => c.id === countryId);
      return country ? country.name : '';
    };


    
  return (
    <div>

    { user ? (
        <div>
          <button onClick={() => dispatch(FilmsRetrieveThunk())}>получить все фильмы</button>

          <div className={styles.containerPoster}>
            {filmObjects && filmObjects.map(film => (
              <div key={film.id} className={styles.containerFilm} >
                <h1 className={styles.nameFilm}>{film.name}</h1>
                <img src={`http://localhost:8000${film.photo}`} alt={film.name} className={styles.filmPoster}/>
                <h1 className={styles.yearFilm}>Год : {film.year}</h1>
                <p className={styles.countryFilm}>Страна: {film.country.map(getCountryNameById).join(', ')}</p>

                 </div>
            ))}
            </div>

        </div>
        ) : 
        
        (<h2>Not User</h2>
        
        ) }

    </div>
  )
}

export default MainPage