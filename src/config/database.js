module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gymPoint',
  define: {
    timestramps: true,
    underscored: true,
    underscoredAll: true
  }
};
