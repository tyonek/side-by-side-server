BEGIN;

TRUNCATE
  sidebyside_comments,
  sidebyside_products,
  sidebyside_users
  RESTART IDENTITY CASCADE;

  INSERT INTO sidebyside_users (username, fullname, password)
VALUES
  ('dunder', 'Dunder Mifflin','$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop','$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO sidebyside_products (title, price, author_id, description, link)
VALUES
  ('Laptop', '$200', 1,
    'Macbook', 'https://www.google.com/'),
  ('Laptop', '$150', 2,
    'HP', 'https://www.google.com/'),
  ('Laptop', '$100', 3,
    'MSI', 'https://www.google.com/'),
  ('iPhone', '$150', 4,
    'iPhone 11 Pro', 'https://www.google.com/'),
  ('iPhone', '$50', 5,
    'iPhone X', 'https://www.google.com/'),
  ('iPhone', '$100', 6,
    'iPhone XS MAX', 'https://www.google.com/'),
  ('Car', '$3000', 1,
    '2010 Honda Accord', 'https://www.google.com/'),
  ('Car', '$5000', 2,
    '2010 Meredes-Benz E300', 'https://www.google.com/'),
  ('Car', '$4000', 3,
    '2012 Ford Fusion SEL', 'https://www.google.com/'),
  ( 'Doll', '$15', 4,
    'Panda Doll', 'https://www.google.com/');

INSERT INTO sidebyside_comments (
  text,
  product_id,
  user_id
) VALUES
  (
    'This post is amazing',
    1,
    2
  ),
  (
    'Yeh I agree it''s amazing',
    1,
    3
  ),
  (
    'I would go so far as to say it''s double amazing',
    1,
    4
  ),
  (
    'A-mazing!',
    1,
    5
  ),
  (
    'That''s some interesting lorems you raise',
    2,
    6
  ),
  (
    'Yeh totally I''d never thought about lorems like that before',
    2,
    1
  ),
  (
    'So you''re saying consectetur adipisicing elit?',
    2,
    3
  ),
  (
    'Sixth? You mean sith?!!',
    4,
    6
  ),
  (
    'What do you call an evil procrastinator? Darth Later! Hahahahaha!',
    4,
    4
  ),
  (
    'Ten ten ten ten ten ten ten!',
    10,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!!!',
    10,
    5
  ),
  (
    '5, 6, 7, 8! My boot-scootin'' baby is drivin'' me crazy...!',
    7,
    1
  ),
  (
    'My obsession from a western! My dance floor date',
    7,
    2
  ),
  (
    'My rodeo Romeo. A cowboy god from head to toe',
    7,
    3
  ),
  (
    'Wanna make you mine. Better get in line. 5, 6, 7, 8!',
    7,
    4
  ),
  (
    'Just a lonely comment',
    9,
    6
  ),
  (
    'Really? Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris??!',
    6,
    5
  ),
  (
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris for sure!!',
    6,
    1
  ),
  (
    'WOAH!!!!!',
    8,
    2
  ),
  (
    '°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸',
    8,
    4
  );

COMMIT;