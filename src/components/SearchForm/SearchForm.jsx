import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    name: '',
  };

  handleSubmit = e => {
    const { name } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (!name.trim()) {
      alert('Please, enter search name');
    }
    onSubmit(name);
    this.reset();
  };
  handleNameChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  reset = () => {
    this.setState({ name: '' });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="name"
          required
          autoFocus
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </SearchFormStyled>
    );
  }
}
