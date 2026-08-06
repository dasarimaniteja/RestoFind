# DineMap

A full-stack web application inspired by Zomato, enabling users to discover nearby restaurants, search, view details, and browse paginated restaurant listings.

## Features

- **Nearby Restaurants:** Detects user location and fetches restaurants within a 10km radius using geospatial queries.
- **Search & Filter:** Search bar for restaurant discovery.
- **Paginated Listings:** Efficiently browse large numbers of restaurants with pagination.
- **Restaurant Details:** View comprehensive info, ratings, cuisine, and booking/delivery options.
- **Modern UI:** Built with React, Vite, Material UI, and custom components.
- **Backend:** Node.js, Express, MongoDB (with geospatial indexing).

## Technologies Used

- **Frontend:** React, Vite, Material UI, Axios, React Router, TanStack Query
- **Backend:** Node.js, Express, MongoDB (with 2dsphere index)
- **Other:** CSS Modules, ReactPaginate

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (running locally on `mongodb://localhost:27017/zomato`)

### Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/DileepKumarRambarki/zomato.git
cd zomato
```

#### 2. Install dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

#### 3. Seed restaurant data

Make sure your MongoDB instance has a `restaurants` collection with location data using GeoJSON format:
```json
{
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  ...
}
```
You may use `server/shift.js` for data migration if needed.

#### 4. Start the backend server

```bash
node index.js
```

The Express server runs on `http://localhost:3000`.

#### 5. Start the frontend

```bash
cd ../client
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Usage

- **Homepage:** Automatically fetches and displays nearby restaurants based on your geolocation.
- **Search:** Use the search bar to find restaurants by name or cuisine.
- **Pagination:** Browse restaurants using pagination controls.
- **Details:** Click a restaurant card to view its full details.

## Project Structure

```
DineMap/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   ├── README.md
│   └── ...
├── server/          # Express backend
│   ├── index.js
│   └── shift.js     # Data migration/util scripts
├── README.md        # Project README
```

## API Endpoints

- `GET /restaurants/nearby?lat=...&lon=...` — Get restaurants near coordinates
- `GET /restaurants?page=...&limit=...` — Get paginated restaurant list
- `GET /restaurants/images?id=...` — Get restaurant images

## License

This project currently does not specify a license.

## Author

[Dileep Kumar Rambarki](https://github.com/DileepKumarRambarki)

---

*This README was auto-generated based on code and project structure. For more details, explore the repository and its source files.*
