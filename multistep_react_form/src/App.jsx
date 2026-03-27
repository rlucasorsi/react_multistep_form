// components
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { FiSend } from 'react-icons/fi';
import UserForm from './components/UserForm';
import ReviewForm from './components/ReviewForm';
import Thanks from './components/Thanks';
import Steps from './components/Steps';

// hooks
import { useForm } from './hooks/useForm';
import { useState } from 'react';

import './App.css';

const formTemplate = {
  name: '',
  email: '',
  review: '',
  comment: '',
};

function App() {
  const [data, setData] = useState(formTemplate);

  const updateFielHandler = (key, value) => {
    setData((prev) => {
      return {...prev, [key]: value};
    })
  }

  const formComponents = [
    <UserForm data={data} updateFielHandler={updateFielHandler} />,
    <ReviewForm data={data} updateFielHandler={updateFielHandler} />,
    <Thanks data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app" data-cy="app">
      <div className="header" data-cy="header">
        <h2 data-cy="header-title">Deixe sua avaliação</h2>
        <p data-cy="header-description">
          Ficamos felizes com a sua compra, utilize o formulário abaixo para
          avaliar o produto
        </p>
      </div>
      <div className="form-container" data-cy="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)} data-cy="form">
          <div className="inputs-container" data-cy="inputs-container">{currentComponent}</div>
          <div className="actions" data-cy="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)} data-cy="btn-back">
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit" data-cy="btn-next">
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button type="button" data-cy="btn-submit">
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
