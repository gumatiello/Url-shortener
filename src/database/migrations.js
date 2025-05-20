import { pool } from './pool.js'

export async function createTables() {
  const query = `
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      original_url TEXT NOT NULL,
      slug VARCHAR(30) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await pool.query(query)
    console.log('Tabelas criadas com sucesso!')
  } catch (err) {
    console.error('Erro ao criar tabelas:', err)
  }
}
