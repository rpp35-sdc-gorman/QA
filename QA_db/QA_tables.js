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

const sendRequest = async (s, method = 'GET', content = {}) => {
  if (method === 'GET') {
    const check = s.split('?');
    const querys = {}; //the queries we get from s
    console.log(check)
    if (check[0] === 'qa/questions') {
       const subS = check[1];
       const arr = subS.split('&');
       for (let a of arr) {
         let keyVal = a.split('=');
         querys[keyVal[0]] = keyVal[1]; // both are strings, not number
       }
      // console.log(querys.product_id, querys.count, querys.page)
       const results = {
        data: await getAllQuestions(querys.product_id, querys.count, querys.page),
       };
       //console.log('test',results);
       return results;
    } else {
      const questionId = check[0].split('/')[2];
      const results = {
        data: {
          results: await getAllAnswers(questionId, querys.count, querys.page)
        },
      }
       //console.log('db return answers',results);
       return results;
    }
  }
}

const getAllQuestions = (product_id, count = 5, page = 1) => {
  // we do not return all answers for given product_id, only part of it from start to end
  const offset = (page - 1) * count; // skip instances
  const limit = count; // fetch limit number after
  let result = {
    product_id,
    results: [],
  }
  return Questions.findAll({
    where: {
      product_id,
      reported: 0,
    },
    offset,
    limit,
  })
  .then((questions) => {
    return Promise.all(questions.map(async (question) => {
      question = question.dataValues;
      let data = { //push data into results as an object, it contains current question info and all answers in obj of obj
        question_id: question.id,
        question_body: question.body,
        question_date: '' + new Date(parseInt(question.date_written)),
        asker_name: question.asker_name,
        question_helpfulness: question.helpful,
        reported: question.reported === 0 ? false : true,
        //value: [],
      }
      //write separate function for fetching answers for a given question id
       const answerArray = await getAllAnswers(question.id);
      // // answer as object
      // // for (let a of answerArray) {
      // //   data.answers[a.id] = a;
      // // }
      // // answer as array
      //data.value = answerArray;
      data.answers = answerArray;
      return data;
    }))
  })
  .then((questions) => {
    result.results = questions;
    //console.log(result);
    return result;
  })
  .catch((err) => console.log(err))
};

const getAllAnswers = (question_id, count = 5, page = 1) => {
  const offset = (page - 1) * count; // skip instances
  const limit = count; // fetch limit number after
  return Answers.findAll({
    where: {
      question_id,
      reported: 0,
    },
    offset,
    limit,
  })
  .then((answers) => answers.filter((answer) => answer.dataValues.reported === 0))
  .then((answers) => (answers.map((answer) => {
    answer = answer.dataValues;
    let modifyAnswer = {
      id: answer.id,
      body: answer.body,
      date: '' + new Date(parseInt(answer.date_written)),
      answerer_name: answer.answerer_name,
      helpfulness: answer.helpful,
      photos: [], //user question_id and answer id to get photo url
    }
    return modifyAnswer;
    })
  ))
  // .then((modifyAnswers) => (modifyAnswers.map((modifyAnswer) => (
  //   data.answers[modifyAnswer.id] = modifyAnswer
  // ))))
  .catch(err => console.log(err))
}

// shapeQA(3, 5, 1);

module.exports = {sequelize, Questions, Answers, Answers_Photos, sendRequest};
