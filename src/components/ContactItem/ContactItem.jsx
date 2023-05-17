import css from 'components/ContactItem/ContactItem.module.css';
import PropTypes from 'prop-types';

export const ContactItem = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;
  return (
    <div className={css.wrapper}>
      <li className={css.item}>
        {name}: {number}
      </li>
      <button
        className={css.button}
        onClick={() => {
          onDeleteContact(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
