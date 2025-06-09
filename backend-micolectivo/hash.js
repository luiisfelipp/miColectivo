const bcrypt = require('bcrypt');

async function generarHash() {
  const passwordPlano = 'chofer';
  const hash = await bcrypt.hash(passwordPlano, 10);
  console.log('Hash:', hash);
}

generarHash();
