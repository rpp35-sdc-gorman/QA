const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('qa', 'yangshi', '000000', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// id,product_id,body,date_written,asker_name,asker_email,reported,helpful
// 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1

class Questions extends Model {};
Questions.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date_written: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  asker_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  asker_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reported: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  helpful: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
    sequelize,
    modelName: 'questions',
    timestamps: false
  }
)


// id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
// 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1


class Answers extends Model {};
Answers.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date_written: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  answerer_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  answerer_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reported: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  helpful: {
    type: Sequelize.INTEGER,
    allowNull: false
  }}, {
    sequelize,
    modelName: 'answers',
    timestamps: false
  }
)

// id,answer_id,url
// 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"

class Answers_Photos extends Model {};
Answers_Photos.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  answer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }}, {
    sequelize,
    modelName: 'answers_photos',
    timestamps: false
  }
)

sequelize.sync();

const shapeQA = async (product_id) => {
  let result = {
    product_id,
    results: [],
  }
  Questions.findAll({
    where: {
      product_id,
      reported: 0,
    }
  })
  .then((questions) => {return Promise.allSettled(questions.map((question) => {
    question = question.dataValues;
    question.answers = [];
    Answers.findAll({
      where: {
        question_id: question.id,
        reported: 0,
      }})
      .then((answers) => (answers.map((answer) => (
          answer = answer.dataValues
          //question.answers.push(answer);
        ))
      ))
      .then((answers) => question.answers = answers)
      // .then((question) => {result.results.push(question); return Promise.allSettled(result.results)})
      // .then(results => console.log(results))
      // .then((question) => result.results.push(question))
      //.then(() => { console.log(question)})
      //await console.log(result.results)
  }))
})
  .then((questions) => console.log('questions',questions))
 // .then(() => console.log(result.results))
  // .then(() => {
  //   //result.results = questions;
  //   console.log(result.results)
  // })
};

shapeQA(3);

module.export = {sequelize, Questions, Answers, Answers_Photos};
