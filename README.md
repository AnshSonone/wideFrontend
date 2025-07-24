## Wide — Problem Discussion Platform
Wide is an asynchronous problem discussion platform I designed and developed as a personal project. Wide allows users to create dedicated rooms to post questions or issues, and others can join these rooms to share answers and solutions at their own pace.

The goal of Wide is to provide a clean, focused space for thoughtful problem-solving and collaboration — encouraging deeper, more organized conversations without the pressure of real-time chat.

## Demo
Live Demo
(https://wide-frontend.vercel.app/login)

## Project Overview
Wide was built to bridge the gap between real-time chat and static forums, offering an easy-to-use, organized space for sharing knowledge and solving problems collaboratively.

## Tech Stack
#### Frontend:
+ HTML5
+ CSS3
+ Tailwind CSS
+ JavaScript
+ React.js

#### Backend:
+ Python
+ Django
+ Django REST Framework (DRF)

#### Authentication:
+ JSON Web Tokens (JWT)

#### Database:
+ MySQL

## Core Features
+ Create Rooms — Users can start a dedicated room with a specific question or problem.
+ Join & Reply — Other users can join existing rooms to contribute answers, suggestions, or ideas.
+ Threaded Discussions — Replies are organized in clear, threaded discussions for easy reading.
+ Discover Rooms — Rooms can be discovered using tags, topics, or keywords.
+ Secure Access — User authentication handled via JWT.

## Getting Started
1. Clone the Repository
```
git clone https://github.com/your-username/wide-discussion-platform.git
  cd wide-discussion-platform
```
2. Backend Setup
```
# Create virtual environment
python -m venv env
source env/bin/activate  # macOS/Linux
env\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start Django server
python manage.py runserver
```
3. Frontend Setup
```
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Authentication
Wide uses JWT (JSON Web Tokens) for secure user authentication.
The backend exposes token-based login & refresh endpoints via the DRF JWT integration.

## Skills Demonstrated
+ Frontend Development with React.js, Tailwind CSS, and modern JavaScript
+ RESTful API design with Django REST Framework
+ Secure authentication using JWT
+ Database design and queries with MySQL
+ Clean separation of frontend & backend logic

## Future Improvements
+ Rich text formatting for discussions
+ Search and filter improvements
+ Role-based permissions for moderators

## Contact
#### Created by Ansh Sonoen
#### Portfolio: (https://my-portfolio-eosin-pi-21.vercel.app/)
#### LinkedIn: (https://www.linkedin.com/in/anshsonone/)
#### Email: sononeansh@gmail.com

Built with ❤️ using React, Django, DRF, Tailwind CSS, and MySQL
