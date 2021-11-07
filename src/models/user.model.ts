import Client  from '../db';

export const insertUser = async (email: string, first_name: string, last_name: string, password: string) => {
    const client = await Client.connect();
    const insertQuery = 'INSERT INTO users (email, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING email';
    const results = await client.query(insertQuery, [email, first_name, last_name, password])
    client.release()
    return results.rows[0];
}
