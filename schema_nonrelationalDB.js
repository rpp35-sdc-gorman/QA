{
  "product_id": Integer,
  "results": [ //array of questions
    {
        "question_id": Integer,
        "question_body": String,
        "question_date": date-time,
        "asker_name": String,
        "asker_email": String,
        "question_helpfulness": Integer,
        "reported": bool,
        "answers": { //object with answer_id as key
          answers_id: {
            "id": integer,
            "body": string,
            "date": date-time,
            "answerer_name": string,
            "answerer_email": string,
            "helpfulness": Integer,
            "reported": bool,
            "photos": [
              {
                "id": Integer,
                "url": String,
              },
              {...}
            ]
          }
        },
        answers_id: {...}
    },
    {...},
    {...},
  ]
}