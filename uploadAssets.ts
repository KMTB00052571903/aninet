// uploadAssets.ts (colócalo en la raíz del proyecto)

import * as fs from 'fs';
import * as path from 'path';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// 1️⃣ Ruta a tu archivo de Service Account de Firebase (descárgalo desde la consola)
const serviceAccount = require('./serviceAccountKey.json') as ServiceAccount;

// 2️⃣ Inicializar el Admin SDK
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://aninet-a8d5b-default-rtdb.firebaseio.com'
});

const db = getDatabase();
const assetsPath = path.join(__dirname, 'src', 'Assets');

// 3️⃣ Leer todos los archivos JSON dentro de /Assets
fs.readdir(assetsPath, (err, files) => {
  if (err) {
    console.error('Error leyendo assets:', err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(assetsPath, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);

      const key = file.replace('.json', '');

      db.ref(key).set(data)
        .then(() => console.log(`✅ Subido ${key}`))
        .catch(console.error);
    }
  });
});
