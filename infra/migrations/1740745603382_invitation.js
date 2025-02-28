/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("invitation", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    name: { type: "varchar(255)", notNull: true },
    pin_code: { type: "varchar(25)", notNull: true, unique: true },
    shipping_date: { type: "varchar(255)" },
    status: { type: "varchar(255)", notNull: true, default: "pendente" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("invitation");
};
