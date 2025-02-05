# Healthcare Quiz MERN - Backend

## 📌 Leírás

Ez a projekt egy egészségügyi kérdőív alkalmazás backend része. Express.js-t és MongoDB-t használ az API végpontok és adatbázis kezelésére. Az oldal működéséről és funkcióiról bővebben olvashatsz a [Frontend repository](https://github.com/SziNo/questionnaire-frontend) oldalán.

## 🌐 Élő projekt

- **Backend URL**: [https://questionnaire-backend-sigma.vercel.app/](https://questionnaire-backend-sigma.vercel.app/)
- **Frontend GitHub**: [https://github.com/SziNo/questionnaire-frontend](https://github.com/SziNo/questionnaire-frontend)
- **Frontend élő URL**: [https://questionnaire-frontend-nine.vercel.app/](https://questionnaire-frontend-nine.vercel.app/)

## 🚀 Stack

A projektben használt technológiák:

- **MongoDB Atlas & Mongoose**: Adatbázis és ORM.
- **Express**: Backend keretrendszer.
- **JWT**: Hitelesítési tokenek kezelése.
- **SendGrid**: E-mailezés.

## 💻 Telepítés lépésről lépésre

1. **Klónozd a repository-t:**

   ```sh
   git clone https://github.com/yourusername/healthcare-quiz-mern-backend.git
   cd healthcare-quiz-mern-backend
   ```

2. **Telepítsd a szükséges függőségeket:**

   ```sh
   npm install
   ```

3. **Hozd létre a `.env` fájlt a következő tartalommal:**
   ```env
   MONGO_URI=a-te-mongodb-stringed
   JWT_SECRET=a-te-jwt-titkos-kulcs
   SENDGRID_API_KEY=a-te-sendgrid-api-kulcsod
   FROM_EMAIL=a-te-email-címed
   PORT=5000
   ADMIN_KEY=1111
   ```
4. **Indítsd el a szervert:**

   ```sh
   npm start
   ```

5. **Opcionálisan: Adatbázis inicializálása:**
   ```sh
   npm run seed
   ```

## 📑 API Endpontok

- **GET /api/quizzes**: Kérdőívek lekérdezése
- **POST /api/users**: Új felhasználó létrehozása
- **GET /api/results**: Eredmények lekérdezése

## ℹ️ Megjegyzés

Később vettem észre, hogy a "quiz" szó helyett a "questionnaire" lett volna a pontos megfelelő, de az átfogó refaktorálás elkerülése érdekében megmaradt a "quiz" kifejezés használata.
