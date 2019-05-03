import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Flex, Button } from "rebass";

import MovieThumbnail from "./movie-thumbnail";

export const discoverMovies = gql`
  query discoverMovies($page: Int!) {
    discover {
      movies(input: { page: $page }) {
        results {
          id
          title
          overview
          poster_path
          backdrop_path
          release_date
          vote_average
        }
        page
        total_pages
        total_results
      }
      tvShows(input: { page: $page }) {
        results {
          id
          name
          overview
          poster_path
          backdrop_path
          first_air_date
          vote_average
        }
        page
        total_pages
        total_results
      }
    }
  }
`;

export const discoverMoviesVars = {
  page: 1
};

export default function MovieList() {
  return (
    <Query query={discoverMovies} variables={discoverMoviesVars}>
      {({ loading, error, data: { discover }, fetchMore }) => {
        if (error) return <div>Error loading movies.</div>;
        if (loading) return <div>Loading...</div>;

        const { movies, tvShows } = discover;
        const notLastPage = movies.page < movies.total_pages;
        return (
          <section>
            <Flex className="content">
              {movies.results.map(movie => (
                <MovieThumbnail key={movie.id} movie={movie} />
              ))}
            </Flex>
            <Flex className="content">
              {tvShows.results.map(movie => (
                <MovieThumbnail key={movie.id} movie={movie} />
              ))}
            </Flex>
            {notLastPage ? (
              <Button onClick={() => loadMoreMovies(discover, fetchMore)}>
                {loading ? "Loading..." : "Show More"}
              </Button>
            ) : null}

            <style jsx>{`
              a {
                margin-right: 10px;
                text-decoration: none;
                padding-bottom: 0;
                border: 0;
              }
            `}</style>
          </section>
        );
      }}
    </Query>
  );
}

function loadMoreMovies(discover, fetchMore) {
  fetchMore({
    variables: {
      page: discover.movies.page + 1
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult;
      }
      return Object.assign({}, previousResult, {
        // Append the new posts results to the old one
        discover: { ...previousResult.discover, ...fetchMoreResult.discover }
      });
    }
  });
}
