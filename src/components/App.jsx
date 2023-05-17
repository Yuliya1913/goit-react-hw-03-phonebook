import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactsList } from 'components/ContactsList/ContactsList';
import css from 'components/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmit = dataForm => {
    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === dataForm.name.toLowerCase()
    );
    // если вводим имя контакта, какое уже есть в телеф.книге, выводим сообщение, что имя такое есть такое и выходим
    if (isExist) {
      alert(`${dataForm.name} is already in contacts.`);
      return;
    }

    // записываем пришедшие данные в новый объект со свойствами
    const newData = {
      ...dataForm,
      id: nanoid(),
    };

    // добавляем этот объект нового контакта в массив контактов
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newData],
      };
    });
  };

  // удаляем  контакт из списка контактов
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = event => {
    // в свойсво filter объекта контакта добавляем значение введенное в инпут для фильтра
    this.setState({ filter: event.currentTarget.value });
  };

  // если изменились(обновились) данные(добавила или удалила контакт), то сохраняем итоговый список контактов в localStorage
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // при загрузке(обновлении) страницы, приложения считываем сохраненные контакты из localStorage и записываем их в State(список контактов)
  componentDidMount() {
    const dataContacts = localStorage.getItem('contacts');
    const contac = JSON.parse(dataContacts);

    // если в localStorage есть данные, то запиши их в State
    if (contac) {
      this.setState({ contacts: contac });
    }
  }

  render() {
    // записываем в отдельный массив контакты, которые отфильтровали для поиска из всех контактов по условию в инпуте
    //  и записываем в качестве пропса для рендера списков контакта по условию, чтобы не менять исходный массив контактов
    const visibleTelephone = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    const isContacts = this.state.contacts.length > 0;

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        <h2>Contacts</h2>

        {isContacts && (
          <Filter value={this.state.filter} onChange={this.handleFilter} />
        )}

        {isContacts && (
          <ContactsList
            contacts={visibleTelephone}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
