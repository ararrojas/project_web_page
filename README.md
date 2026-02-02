# BackToSoil — Fullstack (Django + Vite)

Fullstack project:
- **Backend**: Django + Django REST Framework (Token Auth)
- **Frontend**: React + Vite

## Requirements
- **Python**: 3.9+
- **Node**: 18+

---

## Clone the repository

```bash
git clone git@github.com:ararrojas/project_web_page.git
cd project_web_page
```

If you want to force a custom local folder name:

```bash
git clone git@github.com:ararrojas/project_web_page.git {CUSTOM_NAME}
cd {CUSTOM_NAME}
```

---

## Backend (Django)

From the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies (if you have `requirements.txt`):

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Run the API server:

```bash
python manage.py runserver
```

Backend base URL: `http://127.0.0.1:8000/`

---

## Frontend (Vite + React)

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173/`

---

## API (quick reference)

- **Signup**: `POST /api/signup/`
- **Login**: `POST /api/login/`
- **Products (paginated)**: `GET /api/products/?page=1`
- **Best Sellers**: `GET /api/products/best_sellers/`
- **Stats**: `GET /api/products/stats/`

Authenticated requests must include:

```
Authorization: Token <token>
```

---

## Management commands (seed/demo data)

Run commands from `backend/` with the virtualenv activated:

```bash
cd backend
source .venv/bin/activate
```

Create the 4 “Best Seller” products:

```bash
python manage.py create_best_sellers
```

And then to create more products:

```bash
python manage.py fetch_products
```

