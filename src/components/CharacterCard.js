import "../stylesheets/layout/_charactercard.scss";

const CharacterCard = (props) => {

  const statusIcon = () => {
    if (props.chardata.status === "Dead") {
      return <i className="fas fa-skull-crossbones"></i>
    }
    if (props.chardata.status === "Alive") {
      return ""
    }
    if (props.chardata.status === "unknown") {
      return <i className="fas fa-question"></i>
    }
  }

  return (
    <article className='charCard'>
      <img className='charCard__img' src={props.chardata.image} alt={props.chardata.name} />
      <h2 className='charCard__title'>{props.chardata.name}</h2>
      <h4 className='charCard__subtitle'> {statusIcon()} {props.chardata.species}</h4>
    </article>
  );
};

export default CharacterCard;
