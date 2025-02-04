/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("convidados", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    name: { type: "varchar(255)", notNull: true },
    quantindividuals: { type: "integer", notNull: true, default: 1 },
    quantchildrens: { type: "integer", default: 0 },
    isfamily: { type: "boolean", default: false },
    isfriend: { type: "boolean", default: false },
    ismusician: { type: "boolean", default: false },
    ispadrin: { type: "boolean", default: false },
    pertencea: { type: "varchar(255)" },
    statusconvite: { type: "integer", default: 1 },
    cell: { type: "varchar(255)" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("convidados");
};
