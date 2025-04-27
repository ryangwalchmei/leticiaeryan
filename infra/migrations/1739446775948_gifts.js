/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("gifts", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    ext: { type: "varchar(255)", notNull: true },
    alt: { type: "varchar(255)", notNull: true, default: "" },
    link: { type: "text", notNull: false },
    title: { type: "varchar(255)" },
    price: { type: "varchar(255)" },
    available: { type: "boolean", default: false },
    received: { type: "boolean", default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("gifts");
};
