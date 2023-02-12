import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Loader } from 'components/Loader/Loader';
import { Backdrop } from '../components/Loader/Loader.styled';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    showBtn: false,
    isLoading: false,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      ImageService.getImages(this.state.query, this.state.page)
        .then(({ photos, total_results }) => {
          if (photos.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: this.state.page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      photos: [],
      showBtn: false,
      isLoading: false,
      isEmpty: false,
    });
  };

  handleClickBtn = () => {
    console.log(`Click`);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { showBtn, photos, isLoading, isEmpty } = this.state;

    return (
      <>
        {' '}
        {isLoading && <Backdrop />}
        <SearchForm onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {isEmpty && <Text textAlign="center">No images</Text>}
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {showBtn && <Button onClick={this.handleClickBtn}>Load more</Button>}
      </>
    );
  }
}
