import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiSmileFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
} from 'react-icons/bs';
import './Thanks.css';

const emojiData = {
  unsatisfied: <BsFillEmojiFrownFill />,
  neutral: <BsFillEmojiNeutralFill />,
  satisfied: <BsFillEmojiSmileFill />,
  very_satisfied: <BsFillEmojiHeartEyesFill />,
};

const Thanks = ({ data }) => {
  return (
    <div className="thanks-container" data-cy="thanks-container">
      <h2 data-cy="thanks-title">Falta pouco... </h2>
      <p data-cy="thanks-coupon-text">
        A sua opinião é muito importante, em breve você receberá um cupom de 10%
        de desconto para sua próxima compra.
      </p>
      <p data-cy="thanks-instruction">Para concluir sua avaliação clique no botão de Enviar abaixo.</p>
      <h3 data-cy="thanks-summary-title">Aqui está o resumo da sua avaliação {data.name}:</h3>
      <p className="review-data" data-cy="thanks-review">
        <span>Satisfação com o produto:</span>
        {emojiData[data.review]}
      </p>
      <p className="review-data" data-cy="thanks-comment">
        <span>Comentário:</span>
        {data.comment}
      </p>
    </div>
  );
};

export default Thanks;
