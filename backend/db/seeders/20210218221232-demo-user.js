'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.triplemint.com%2Fblog%2Fdogs-of-new-york-urban-living-for-mans-best-friends%2F&psig=AOvVaw3UD658QKwQp9h2QRBqt9vD&ust=1629489341484000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICqgf7uvfICFQAAAAAdAAAAABAJ'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'http://36.media.tumblr.com/ed3665ca0c9e26a86ee98c40a07e43f5/tumblr_nobezwIsib1slm9b6o1_1280.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://lovelace-media.imgix.net/getty/604560524.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.amny.com/wp-content/uploads/2020/07/GettyImages-153787739.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.sparefoot.com/moving/wp-content/uploads/2018/02/dogs-in-nyc.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.cityguideny.com/uploads2/130302/nycdoggies.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://cdn.theculturetrip.com/wp-content/uploads/2016/06/6312937936_cebaf2feb9_b.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.syracuse.com/resizer/pDir6VzhHyZuIIyqdTmmD454IH4=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/state_impact/photo/2015/12/23/2015-05-20-dl-vet9jpg-6f5628af3c7e5a3a.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.chrisporsz.com/uploads/7/0/3/3/7033374/3733603_orig.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://30a.com/wp-content/uploads/2016/07/Obi-on-the-beach.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sheknows.com%2Fliving%2Farticles%2F1123007%2Fbest-dog-breeds-for-beach-lovers%2F&psig=AOvVaw1ElNMR37jtd_7zD7AsVrE8&ust=1629489793254000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCND_qdXwvfICFQAAAAAdAAAAABAN'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.tripswithpets.com/sites/default/files/IMCE/Images-blog/beach-dog-water-ball.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-on-beach-1559292224.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.puppypaws.info/wp-content/uploads/2019/11/fi-dog-lying-on-beach.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://static.onecms.io/wp-content/uploads/sites/34/2021/01/04/sled-dogs-in-snow-getty-0121.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.thesprucepets.com/thmb/qzGi_EfqFa9RVxj5YwDj7ZBxr14=/3255x2441/smart/filters:no_upscale()/GettyImages-998740302-9f0ea8a897054700a449f2ae43de0753.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.dogingtonpost.com/wp-content/uploads/2018/09/falldangers1-1000x600.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://iheartdogs.com/wp-content/uploads/2020/09/dog-autumn-leaves-scaled-e1600459953910.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://wallpaperaccess.com/full/1357521.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://cdn9.dissolve.com/p/D9_16_013/D9_16_013_1200.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://www.lonetreevet.com/blog/wp-content/uploads/2019/06/iStock-594042130.jpg'
      },
      {
        email: faker.internet.email(),
        username: 'Cobain',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://d1dd4ethwnlwo2.cloudfront.net/wp-content/uploads/2018/08/dog-swim_retriever-in-pool.jpg'
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZ2mglVZNY4S5hsiP8DxcZOas9EcPb8yzm43YH48mzkDGgcrfveLOwgaxZZKrkSdMlv0&usqp=CAU'
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users',{
      username: { [Op.in]: ['Demo-lition']}
    }, {});
  }
};
