const xss = require('xss');

const ProductsService = {
  getAllProducts(db) {
    return db
      .from('sidebyside_products AS product')
      .select(
        'product.id',
        'product.title',
        'product.date_created',
        'product.category',
        'product.description',
        'product.price',
        'product.link',
        db.raw(
          `count(DISTINCT comm) AS number_of_comments`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'username', usr.username,
              'fullname', usr.fullname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'sidebyside_comments AS comm',
        'product.id',
        'comm.product_id',
      )
      .leftJoin(
        'sidebyside_users AS usr',
        'product.author_id',
        'usr.id',
      )
      .groupBy('product.id', 'usr.id');
  },

  getById(db, id) {
    return ProductsService.getAllProducts(db)
      .where('product.id', id)
      .first();
  },

  getCommentsForProduct(db, product_id) {
    return db
      .from('sidebyside_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('comm.product_id', product_id)
      .leftJoin(
        'sidebyside_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id');
  },

  serializeProduct(product) {
    const { author } = product;
    return {
      id: product.id,
      title: xss(product.title),
      price: xss(product.price),
      description: xss(product.description),
      link: xss(product.link),
      date_created: new Date(product.date_created),
      number_of_comments: Number(product.number_of_comments) || 0,
      author: {
        id: author.id,
        user_name: author.user_name,
        full_name: author.full_name,
        date_created: new Date(author.date_created),
        date_modified: new Date(author.date_modified) || null
      },
    };
  },

  insertProduct(db, newProduct) {
    return db
      .insert(newProduct)
      .into('sidebyside_products')
      .returning('*')
      .then(([product]) => product)
      .then(product =>
        ProductsService.getById(db, product.id)
      )
  },

  serializeProductComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      product_id: comment.product_id,
      text: xss(comment.text),
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    };
  },
};

module.exports = ProductsService;