# TV Binge

## 1. Introduction

TV Binge is a dynamic TV show tracking web application designed to help television enthusiasts discover, search, and manage their favorite TV series. By integrating directly with The Movie Database (TMDB) API, the application delivers up-to-date show information, trending series, cast details, and media assets. It provides a seamless user experience powered by secure user authentication and interactive tracking interfaces.

## 2. Current Features Implemented

### User Authentication & Session Management
Authentication is implemented using Next.js Server Actions combined with Zod for strict input validation. User credentials are hashed using `bcryptjs` and stored in a PostgreSQL database via Prisma ORM. Session handling uses JSON Web Tokens (JWT) signed and verified with the `jose` library, stored securely in HTTP-only cookies, while a custom React Context (`AuthContext`) manages auth modal states across the app.

### TV Show Search & Live Preview
The search functionality interacts with TMDB API search endpoints (`searchShowByName`) to allow users to search for shows by name. It dynamically retrieves poster base URLs and sizes using TMDB configuration parameters, rendering interactive live search previews with poster images and title metadata.

### Popular Shows Discovery & Dynamic Filtering
Users can discover popular TV shows fetched from TMDB's discovery API (`fetchPopularShows`). The feature supports multi-criteria filtering by genre, origin country, and language by mapping filter options to TMDB API query parameters (`mapFilters` and `fetchFilters`).

### Detailed Show & Episode Metadata Overview
Show detail workflows query TMDB endpoints (`fetchShowDetails`, `fetchEpisodeDetails`) to pull rich metadata. This includes high-resolution show logos, backdrop images, top cast credits, season listings, and episode details.

## 3. In Progress / Upcoming Features

- Watchlist & Favorites Management
- Season & Episode Progress Tracking
- User Ratings & Reviews System
- Personalized Recommendations Engine
- Custom User Profiles & Activity History

## 4. Technologies Used

- **Framework**: Next.js 16 (App Router) & React 19
- **Database & ORM**: PostgreSQL & Prisma ORM 7 (with `@prisma/adapter-pg`)
- **External API**: TMDB (The Movie Database) API
- **Authentication & Security**: Jose (JWT), BcryptJS, & HTTP-Only Cookie Session Management
- **Data Validation**: Zod
- **Styling & UI**: Vanilla CSS Modules & Lucide React Icons

