import { FC } from 'react';

interface Props {};

const ErrorPage: FC<Props> = () => {
    return (
      <div>
        <h1>Mais ou es-tu allé ?</h1>
        <p>Conduire vers la lune n'existe pas !</p>
      </div>
    );
  };
  
  export default ErrorPage;