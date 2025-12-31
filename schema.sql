CREATE DATABASE IF NOT EXISTS if0_40798106_movie_db;
USE if0_40798106_movie_db;

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(2048),
    video_url VARCHAR(2048),
    download_link VARCHAR(2048),
    description TEXT,
    category VARCHAR(255) COMMENT 'Comma separated: "Trending Now, Latest Releases, Top Rated"',
    type VARCHAR(50) DEFAULT 'movie' COMMENT 'movie or tv',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS featured_movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    backdrop_url VARCHAR(2048),
    year VARCHAR(10),
    rating VARCHAR(10),
    duration VARCHAR(20),
    genre VARCHAR(100),
    download_link VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data
INSERT INTO movies (title, thumbnail, description, category, type, video_url) VALUES 
('Inception', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'A thief who steals corporate secrets...', 'Trending Now, Top Rated', 'movie', 'https://youtu.be/YoHD9XEInc0'),
('Interstellar', 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8ahMcafCUyGdjIyns.jpg', 'A team of explorers travel through a wormhole...', 'Trending Now, Latest Releases', 'movie', 'https://youtu.be/zSWdZVtXT7E');

INSERT INTO featured_movie (title, description, backdrop_url, year, rating, duration, genre, download_link) VALUES 
('Dune: Part Two', 'Follow the mythic journey of Paul Atreides...', 'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', '2024', 'PG-13', '2h 46m', 'Sci-Fi', 'https://example.com/download');
