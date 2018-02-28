
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {title: 'Star Wars', description: 'religous extremists violently overthrow the elected goverment', genre: 'sci fi',vote_count: 0},
        {title: 'The Matrix', description: 'guys wear sunglasses at night', genre: 'sci fi', vote_count: 0},
        {title: 'Vanilla Sky', description: '??', genre: 'sci fi',vote_count: 0},
        {title: 'Iron an', description: 'Im a dick, wait no Im not', genre: 'sci fi',vote_count: 0},


      ]);
    });
};
