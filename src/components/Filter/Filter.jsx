import css from 'components/Filter/Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <label htmlFor="" className={css.label}>
      Find contacts by name
      <input
        className={css.filter}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
