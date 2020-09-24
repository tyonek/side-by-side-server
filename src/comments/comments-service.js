const xss = require('xss');

const CommentsService = {
  getById(db, id) {
    return db
      .from('sidebyside_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        'comm.article_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.username,
                  usr.fullname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'sidebyside_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first();
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('sidebyside_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      );
  },

  serializeComment(comment) {
    const { user } = comment;
    return {
      id: comment.id,
      text: xss(comment.text),
      article_id: comment.article_id,
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    };
  }
};

module.exports = CommentsService;