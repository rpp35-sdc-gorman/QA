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

const sendRequest = (s, method = 'GET', content = {}) => {
  if (method === 'GET') {
    const check = s.split('?');
    const querys = {}; //the queries we get from s
    if (check[0] === 'qa/questions') {
       const subS = check[1];
       const arr = subS.split('&');
       for (let a of arr) {
         let keyVal = a.split('=');
         querys[keyVal[0]] = keyVal[1]; // both are strings, not number
       }
       const results = shapeQA(querys.product_id, (querys.count - 1) * querys.page, querys.count * querys.page); //start, end for result.results
       return results;
    }
  }
}

const shapeQA = (product_id, start, end) => {
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
  .then((questions) => {
    let datas = []; //array of promises
    questions.forEach((question) => {
      question = question.dataValues;
      let data = {};
      data.question_id = question.id;
      data.question_body = question.body;
      data.question_date = '' + new Date(parseInt(question.date_written));
      data.asker_name = question.asker_name;
      data.question_helpfulness = question.helpful;
      data.reported = question.reported === 0 ? false : true;
      data.answers = {};
      //push in array of promises, then we can use promise.all to wait for them all to settled
      datas.push(Answers.findAll({
        where: {
          question_id: question.id,
          reported: 0,
        }})
        .then((answers) => (answers.map((answer) => {
          //only included non reported in modifyAnswer, reshape the answer to be consistent with the given database API
          if (answer.dataValues.reported === 0) {
            answer = answer.dataValues;
            let modifyAnswer = {
              id: answer.id,
              body: answer.body,
              date: '' + new Date(parseInt(answer.date_written)),
              answerer_name: answer.answerer_name,
              helpfulness: answer.helpful,
              photo: [], //user question_id and answer id to get photo url
            }
            return modifyAnswer;
          }
        })
        ))
        .then((modifyAnswers) => (modifyAnswers.map((modifyAnswer) => (
          data.answers[modifyAnswer.id] = modifyAnswer
        ))))
        .then(() => data)
        .catch(err => console.log(err)))
   })
    return Promise.allSettled(datas);
  })
  .then(() => {
    result.results = result.results.slice(start, end);
    return result;
    //console.log('questions',questions[1].value.answers)
  })
};

//shapeQA(3);

module.exports = {sequelize, Questions, Answers, Answers_Photos, sendRequest};
