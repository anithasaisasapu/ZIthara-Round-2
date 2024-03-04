import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Grid, Form, Header, Segment, Input, Pagination } from 'semantic-ui-react';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); 

  const itemsPerPage = 20;

  const handleSortOrderChange = (event, { value }) => {
    setSortOrder(value);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePageChange = (event, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handleSearchChange = (event, { value }) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  const handleSortChange = (event, { value }) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  };
  const filteredAndSortedCustomers = () => {
    let filteredData = [...customers];
    
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredData = filteredData.filter(customer =>
        customer.customername.toLowerCase().includes(searchTermLower) ||
        customer.location.toLowerCase().includes(searchTermLower)
      );
    }
    if (sortBy) {
      filteredData.sort((a, b) => {
        const dateA = new Date(a.createdat);
        const dateB = new Date(b.createdat);

        if (sortBy === 'date') {
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortBy === 'time') {
          const timeA = a.createdat.split('T')[1];
          const timeB = b.createdat.split('T')[1];
          return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
        }
        return 0;
      });
    }

    return filteredData;
  };

  const paginatedData = filteredAndSortedCustomers().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(filteredAndSortedCustomers().length / itemsPerPage);

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4vh', marginBottom: '3vh' }}>
        <Pagination
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          boundaryRange={0}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
        />
      </div>
    );
  };

  return (
    <Container style={{ padding: '2rem', marginTop: '2rem' }}>
      <Segment>
        <Header textAlign='center'>Customer Data</Header>
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group widths='equal' >
                  <Form.Field>
                    <label>Search By</label>
                    <Input
                      icon='search'
                      placeholder='Customer Name or Location'
                      onChange={handleSearchChange}
                      value={searchTerm}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Form>
                <Form.Group widths='equal' >
                  <Form.Field>
                    <Form.Select
                      label='Sort By'
                      options={[
                        { key: 'date', text: 'Date', value: 'date' },
                        { key: 'time', text: 'Time', value: 'time' },
                      ]}
                      onChange={handleSortChange}
                      placeholder='Sort By'
                      value={sortBy}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Form>
                <Form.Group widths='equal' >
                  <Form.Field>
                    <Form.Select
                      label='Sort Order'
                      options={[
                        { key: 'asc', text: 'Ascending', value: 'asc' },
                        { key: 'desc', text: 'Descending', value: 'desc' },
                      ]}
                      onChange={handleSortOrderChange}
                      placeholder='Sort Order'
                      value={sortOrder}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>


      <Segment>
        <Table compact striped celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sno</Table.HeaderCell>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedData.map(customer => (
              <Table.Row key={customer.sno}>
                <Table.Cell>{customer.sno}</Table.Cell>
                <Table.Cell>{customer.customername}</Table.Cell>
                <Table.Cell>{customer.age}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
                <Table.Cell>{customer.location}</Table.Cell>
                <Table.Cell>{new Date(customer.createdat).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(customer.createdat).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {renderPaginationControls()}
      </Segment>
    </Container>
  );
}

export default CustomerTable;
