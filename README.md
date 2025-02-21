# Welcome Space Force! 🚀

Thanks for evaluating my CRUD Application. Looking forward to earning the Z-Prefix!

## Prerequisites

Before starting, please ensure you have:
- Docker Desktop installed and running on your machine
- Make sure Ports 3000 and 27017 are free and not being used by other applications
- Created a `.env` and a `.env.local` file in the root directory with the following content:
```.env and env.local
# MongoDB Configuration
MONGODB_URI=mongodb://admin:password123@mongodb:27017/mydatabase?authSource=admin
NEXTAUTH_SECRET=7FL5nbJj5tmI/c4id5bTkvVUo94sdSed2teiWMGeVDg=
NEXTAUTH_URL=http://localhost:3000
```

You can install Docker Desktop by visiting the [Docker Website](https://app.docker.com/)

This is the current web URL as of January 2025.

## Quick Start

If you've previously run the application, first clean up existing containers and volumes:
```bash
docker-compose down -v
```
> Note: The `-v` flag removes all volumes associated with the containers, ensuring a clean start.

Then, to launch the application:
```bash
docker-compose up --build -d
```

> Note: The `-d` flag runs the containers in detached mode (background), allowing continued use of your terminal.

## Monitoring & Troubleshooting

To monitor the application or check for errors:
1. Open Docker Desktop
2. Navigate to the Containers section
3. Locate the Supra Coder container
4. View real-time application logs

Happy New Year! 🎉