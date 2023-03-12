import { Searchbar } from './Searchbar/Searchbar';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
 
  const handleSubmit = textSearch =>  setTextSearch(textSearch);
     
    return (
    <div>
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery value={textSearch} />
    </div>
  );
};
