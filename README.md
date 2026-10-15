# ZeroBytech — Cloud Engineering Consultancy Website

Official 5-page enterprise marketing website for **ZeroBytech** (`zerobytech.com`).

> "We do more than provide services; we engineer the technical foundation required for your business growth."

---

## 🚀 Quick Start with Docker

### 1. Using Docker Compose (Recommended)
To build and run the production NGINX container:
```bash
docker compose up -d --build
```
The site will be live at `http://localhost`.

To stop the container:
```bash
docker compose down
```

### 2. Using Docker CLI Directly
```bash
# Build the Docker image
docker build -t zerobytech:latest .

# Run the container mapping port 80 (or change -p 8080:80)
docker run -d --name zerobytech_website -p 80:80 zerobytech:latest
```

---

## 📦 Push to Git (GitHub / GitLab)

1. **Stage and commit your changes**:
   ```bash
   git add .
   git commit -m "feat: complete ZeroBytech 5-page enterprise website with Docker configuration"
   ```

2. **Link your remote repository and push**:
   ```bash
   # Rename default branch to main
   git branch -M main

   # Add your GitHub repository URL (replace with your actual repository)
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git

   # Push code to remote repository
   git push -u origin main
   ```

---

## 🌐 Pages & Structure

- `index.html`: Hero with dark grid, 4-item trust strip, Bento grid, 4-phase timeline, value proposition, and closing CTA band.
- `services.html`: Alternating 2-column technical deep dives with outcome checklists and tool badges.
- `about.html`: Founding story, mission statement, 4 core values, 6 technology principles, and team cards.
- `case-studies.html`: Case studies across FinTech, B2B SaaS, and HealthTech with Before &rarr; After comparison matrices.
- `contact.html`: Request review form with honeypot spam protection, loading state, success confirmation, and 4-question FAQ accordion.
- `nginx.conf`: Production NGINX configuration with gzip compression, security headers, and caching.
- `Dockerfile`: Lightweight Alpine-based container image.
- `sitemap.xml` & `robots.txt`: Search engine optimization and canonical indexing.
