import React from 'react';
import axios from 'axios';
import { Dropdown, Form, Input } from 'semantic-ui-react';

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessList: [],
      searchQuery: '',
      value: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e, { searchQuery }) {
    this.setState({ searchQuery });
    axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.searchQuery}`)
      .then(response => {
        //semantic renders dropdown by text property
        var mapped = response.data.map(b => {
          b.text = b.name;
          return b;
        });
        console.log('RESPONSE', mapped);
        this.setState({ businessList: mapped });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { handleMouseDown, handleChange, position, date, company, status } = this.props;
    const { value } = this.state;
    const d = new Date(date);
    const options = [
      { key: 1, text: 'In Progress', value: 1 },
      { key: 2, text: 'Submitted', value: 2 },
      { key: 3, text: 'Phone Screen', value: 3 },
      { key: 4, text: 'Onsite Interview', value: 4 },
      { key: 5, text: 'Offer', value: 5 },
    ];
    return (
      <div>
        <Form>
          <div>
            <label>Company Name</label>
            <Dropdown
              fluid
              selection
              multiple={false}
              search={true}
              options={this.state.businessList}
              placeholder={company}
              onSearchChange={this.handleSearchChange}
              onMouseDown={handleMouseDown}
              disabled={false}
              loading={false}
              id="currentCompany"
            />
          </div>
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label="Position"
            type="text"
            id="inputPosition"
            placeholder={position}
          />
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label={`Date Applied: ${ isNaN(d.getMonth()) ? '' : ((d.getMonth()+1) +'/'+ (d.getDate()+1) +'/'+ d.getFullYear())}` }
            type="date"
            id="inputDate"
          />
          <br />
          <Dropdown
            onChange={handleMouseDown}
            //onClose={handleMouseDown}
            options={options}
            placeholder={status ? status : 'Choose an option'}
            selection
            //value={value}
            id="selectedStatus"
          />
        </Form>
      </div>
    );
  }
}

export default ModalForm;
