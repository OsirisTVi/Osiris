import React from 'react'
import style from './InterfaceAddFilmPrivete.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function InterfaceAddFilmPrivate() {

        const [selectedImages, setSelectedImages] = useState([]);
        const {user} = useSelector(state=>state.auth)
    
        
        
        const handleDragOver = (event) => {
            event.preventDefault();
          };


          const handleDrop = (event) => {
            event.preventDefault();
            const files = event.dataTransfer.files;
            const imageUrls = [];
        
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const imageUrl = URL.createObjectURL(file);
              imageUrls.push(imageUrl);
            }
        
            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...imageUrls]);
        };

          





  return (

    <>

    {user ? ( 

    <div>

        
        
        <form id="film-form" encType="multipart/form-data" >

        <div>

      <label htmlFor="name">Название фильма :</label>
      <input type="text" name="name" id="name" /><br/>

      </div>

     <div className='genre'>
      <label htmlFor="genres">Жанры :</label>
      <select name="genres" id="genres" multiple>
        <option value="драма">Драма</option>
        <option value="фэнтези">Фэнтези</option>
        <option value="криминал">Криминал</option>
        </select>
        </div>




        <br/>

        <div>
      <div
        className={style.image_dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImages.map((imageUrl, index) => (
          <img className={style.image} key={index} src={imageUrl} alt={`Фото ${index}`} />
        ))}
      </div>

      <label htmlFor="image-input" id="image-input-label">
        Выберите файлы:
      </label>
      <input
        type="file"
        id="image-input"
        multiple
        style={{ display: 'none' }}
      />
    </div>





      <label htmlFor="country">Страна:</label>
      <input type="text" name="country" id="country" /><br/>


      <button type="submit">Добавить фильм</button>

    </form>
    
    </div> ) : ( Navigate('/')) }


    </>

  )
}

export default InterfaceAddFilmPrivate