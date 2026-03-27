import { AiOutlineUser, AiOutlineStar } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import './Steps.css';

const Steps = ({ currentStep }) => {
  return (
    <div className="steps" data-cy="steps">
      <div className="step active" data-cy="step-identification">
        <AiOutlineUser />
        <p>Identificação</p>
      </div>
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`} data-cy="step-review">
        <AiOutlineStar />
        <p>Avaliação</p>
      </div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`} data-cy="step-submit">
        <FiSend />
        <p>Envio</p>
      </div>
    </div>
  );
};

export default Steps;
