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
    name: { type: "varchar(255)", notNull: true },
    categoria: { type: "varchar(255)", notNull: true, default: "Não listado" },
    preco_estimado: { type: "integer", default: 0 },
    loja_sugerida: { type: "varchar(255)" },
    status: { type: "varchar(255)", default: "Ocioso" },
    data_reserva: { type: "varchar(255)", default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("gifts");
};
