import { Component } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  handleChange = event => {
    //   при введении данных в инпут записываем эти значения в качестве свойств и их значений в объекте
    // console.log(event.currentTarget.value);
    // console.log(event.currentTarget.name);

    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmitForm = event => {
    event.preventDefault();

    //   вызываем и передаем данные при сабмите формы в Арр в качестве аргумента dataForm

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmitForm}>
        <label className={css.label} htmlFor={this.nameId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            required
            onChange={this.handleChange}
            id={this.nameId}
          />
        </label>
        <label className={css.label} htmlFor={this.numberId}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
            id={this.numberId}
          />
        </label>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
