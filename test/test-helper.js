const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      fullname: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      username: 'test-user-2',
      fullname: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      username: 'test-user-3',
      fullname: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      username: 'test-user-4',
      fullname: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeProductsArray(users) {
  return [
    {
      id: 1,
      title: 'First test post!',
      price: '100',
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test post!',
      price: '100',
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test post!',
      price: '100',
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test post!',
      price: '100',
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeCommentsArray(users, products) {
  return [
    {
      id: 1,
      text: 'First test comment!',
      product_id: products[0].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      text: 'Second test comment!',
      product_id: products[0].id,
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      text: 'Third test comment!',
      product_id: products[0].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      text: 'Fourth test comment!',
      product_id: products[0].id,
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      text: 'Fifth test comment!',
      product_id: products[products.length - 1].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      text: 'Sixth test comment!',
      product_id: products[products.length - 1].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      text: 'Seventh test comment!',
      product_id: products[3].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeExpectedProduct(users, product, comments=[]) {
  const author = users
    .find(user => user.id === product.author_id)

  const number_of_comments = comments
    .filter(comment => comment.product_id === product.id)
    .length

  return {
    id: product.id,
    price: product.price,
    title: product.title,
    description: product.description,
    date_created: product.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      username: author.username,
      fullname: author.fullname,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}

function makeExpectedProductComments(users, productId, comments) {
  const expectedComments = comments
    .filter(comment => comment.product_id === productId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        username: commentUser.username,
        fullname: commentUser.fullname,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}

function makeMaliciousProduct(user) {
  const maliciousProduct = {
    id: 911,
    price: '100',
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author_id: user.id,
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedProduct = {
    ...makeExpectedProduct([user], maliciousProduct),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousProduct,
    expectedProduct,
  }
}

function makeProductsFixtures() {
  const testUsers = makeUsersArray()
  const testProducts = makeProductsArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testProducts)
  return { testUsers, testProducts, testComments }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        sidebyside_products,
        sidebyside_users,
        sidebyside_comments
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE sidebyside_products_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sidebyside_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sidebyside_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('sidebyside_products_id_seq', 0)`),
        trx.raw(`SELECT setval('sidebyside_users_id_seq', 0)`),
        trx.raw(`SELECT setval('sidebyside_comments_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('sidebyside_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('sidebyside_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedProductsTables(db, users, products, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('sidebyside_products').insert(products)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('sidebyside_products_id_seq', ?)`,
      [products[products.length - 1].id],
    )
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into('sidebyside_comments').insert(comments)
      await trx.raw(
        `SELECT setval('sidebyside_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}

function seedMaliciousProduct(db, user, product) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('sidebyside_products')
        .insert([product])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeProductsArray,
  makeExpectedProduct,
  makeExpectedProductComments,
  makeMaliciousProduct,
  makeCommentsArray,

  makeProductsFixtures,
  cleanTables,
  seedProductsTables,
  seedMaliciousProduct,
  makeAuthHeader,
  seedUsers,
}