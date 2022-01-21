import { Pool } from 'pg';

const connectionString = 'postgres://uszulbno:Bh0d4EVIiXjIHwkUR2AOtBPZree2NHHY@kesavan.db.elephantsql.com/uszulbno';

const db = new Pool({ connectionString });

export default db;
