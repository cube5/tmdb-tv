import { Box, Card, Image, Heading, Text } from "rebass";
import Link from "next/link";

export default function MovieThumbnail({ movie }) {
  const width = 400;
  const src = `https://image.tmdb.org/t/p/w${width}${movie.poster_path}`;
  const name = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  return (
    <>
      <Link href={`/movies/${movie.id}`}>
        <a className="item">
          <Box width={width}>
            <Card
              p={1}
              borderRadius={2}
              boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            >
              <Image src={src} width={width} />
              <Box px={2}>
                <Heading as="h3">{name}</Heading>
                <Text fontSize={24}>{releaseDate}</Text>
              </Box>
            </Card>
          </Box>
        </a>
      </Link>
    </>
  );
}
