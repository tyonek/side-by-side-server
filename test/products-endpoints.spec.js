const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Products Endpoints', function() {
  let db

  const {
    testUsers,
    testProducts,
    testComments,
  } = helpers.makeProductsFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/products`, () => {
    context(`Given no products`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/products')
          .expect(200, [])
      })
    })

    context('Given there are products in the database', () => {
      beforeEach('insert products', () =>
        helpers.seedProductsTables(
          db,
          testUsers,
          testProducts,
          testComments,
        )
      )

      it('responds with 200 and all of the products', () => {
        const expectedProducts = testProducts.map(product =>
          helpers.makeExpectedProduct(
            testUsers,
            product,
            testComments,
          )
        )
        return supertest(app)
          .get('/api/products')
          .expect(200, expectedProducts)
      })
    })

    context(`Given an XSS attack product`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousProduct,
        expectedProduct,
      } = helpers.makeMaliciousProduct(testUser)

      beforeEach('insert malicious product', () => {
        return helpers.seedMaliciousProduct(
          db,
          testUser,
          maliciousProduct,
        )
      })

      it('removes XSS attack description', () => {
        return supertest(app)
          .get(`/api/products`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedProduct.title)
            expect(res.body[0].description).to.eql(expectedProduct.description)
          })
      })
    })
  })

  describe(`GET /api/products/:product_id`, () => {
    context(`Given no products`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const productId = 123456
        return supertest(app)
          .get(`/api/products/${productId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `product doesn't exist` })
      })
    })

    context('Given there are products in the database', () => {
      beforeEach('insert products', () =>
        helpers.seedProductsTables(
          db,
          testUsers,
          testProducts,
          testComments,
        )
      )

      it('responds with 200 and the specified product', () => {
        const productId = 2
        const expectedProduct = helpers.makeExpectedProduct(
          testUsers,
          testProducts[productId - 1],
          testComments,
        )

        return supertest(app)
          .get(`/api/products/${productId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedProduct)
      })
    })

    context(`Given an XSS attack product`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousProduct,
        expectedProduct,
      } = helpers.makeMaliciousProduct(testUser)

      beforeEach('insert malicious product', () => {
        return helpers.seedMaliciousProduct(
          db,
          testUser,
          maliciousProduct,
        )
      })

      it('removes XSS attack description', () => {
        return supertest(app)
          .get(`/api/products/${maliciousproduct.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedProduct.title)
            expect(res.body.description).to.eql(expectedProduct.description)
          })
      })
    })
  })

  describe(`GET /api/products/:product_id/comments`, () => {
    context(`Given no products`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const productId = 123456
        return supertest(app)
          .get(`/api/products/${productId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `product doesn't exist` })
      })
    })

    context('Given there are comments for product in the database', () => {
      beforeEach('insert products', () =>
        helpers.seedProductsTables(
          db,
          testUsers,
          testProducts,
          testComments,
        )
      )

      it('responds with 200 and the specified comments', () => {
        const productId = 1
        const expectedComments = helpers.makeExpectedproductComments(
          testUsers, productId, testComments
        )

        return supertest(app)
          .get(`/api/products/${productId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedComments)
      })
    })
  })
})