Arius — Game Store

Arius is a modern game store web application built as a frontend-focused portfolio project.
The project was designed to demonstrate practical frontend development, modern UI design, client-side state management, form validation, API/data handling, authentication flows, and integration with Supabase.

✨ Features

* Modern dark-themed game store UI
* Responsive design for desktop and mobile
* Game discovery and search
* Dynamic game categories
* Game detail pages
* Featured and new release sections
* Shopping cart functionality
* User authentication
* User profile and profile editing
* Avatar upload and profile management
* Wishlist structure
* Password reset flow
* Form validation with Zod
* State management with Zustand
* Supabase database integration
* Supabase Storage for user avatars
* Custom error handling
* Dynamic metadata and SEO configuration
* Custom `sitemap.js` and `robots.js`
* Responsive navigation and reusable UI components

🛠️ Tech Stack

* Next.js
* React
* JavaScript
* Tailwind CSS
* Zustand
* React Hook Form
* Zod
* Supabase
* Lucide React

📁 Project Structure

app/
├── components/          # Reusable UI components
│   ├── ErrorHandle/      # Error handling components
│   └── ...               # Shared application components
│
├── hooks/               # Custom React hooks
│
├── js/                  # Application logic and data functions
│   ├── Authentication
│   ├── Data fetching
│   ├── Cart operations
│   └── Other application utilities
│
├── lib/                 # External service configuration
│   └── Supabase         # Supabase client configuration
│
├── schemas/             # Zod validation schemas
│
├── games/               # Game listing and category pages
├── game-detail/         # Dynamic game detail pages
├── profile/             # User profile
├── register/            # Registration
├── login/               # Authentication
├── forgotPassword/      # Password recovery
├── setting/             # User settings
├── search-result/       # Search results
├── category/            # Dynamic category pages
├── cart/                # Shopping cart
├── about-us/            # About Arius
├── privacy/              # Privacy policy
├── terms/                # Terms and conditions
└── coming-soon/         # Placeholder for future sections

🏗️ Architecture

The project follows a separation between UI components, application logic, data fetching, validation, and external service configuration.

Components

Reusable UI elements are organized inside the `components` directory.
Complex or shared UI functionality such as error handling is separated into dedicated component groups.

Data & Application Logic

Data fetching and application-related functions are separated from the UI and maintained inside the `js` directory.

This includes functionality such as:

* Authentication
* User management
* Cart operations
* Data fetching
* Profile updates
* Password recovery

### State Management

Zustand is used for client-side application state, particularly for authentication and user information.

Validation

Form validation is handled using **Zod**, with schemas separated from the UI logic.

Backend & Storage

Supabase is used for:

* Database operations
* User-related data
* Shopping cart data
* User avatar storage
* Profile information

🎯 Project Goal

Arius was built primarily as a **frontend portfolio project**.

The goal was not to reproduce every possible feature of a production-scale e-commerce platform, but to demonstrate the ability to build a complete, structured application while working with real-world concepts such as:

* Authentication
* Database interaction
* State management
* Form validation
* File uploads
* SEO
* Error handling
* Dynamic routing
* Responsive UI
* Application architecture

Some secondary sections are intentionally simplified or represented by a `Coming Soon` page to keep the scope focused on the core shopping experience and frontend development.

🚀 Getting Started

Clone the repository:

git clone https://github.com/grunegi/arius-game-store.git
cd arius-game-store

Install dependencies:

npm install

Create a `.env.local` file and configure the required Supabase environment variables.

Then run the development server:

npm run dev

Open:

http://localhost:3000

📌 Status

Arius is an ongoing portfolio project.
The core shopping experience and frontend architecture are implemented, while some secondary features may remain simplified or planned for future development.

👨‍💻 Author

Built as a personal frontend development portfolio project.
