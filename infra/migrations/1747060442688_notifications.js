exports.shorthands = undefined;

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.up = (pgm) => {
  pgm.createTable("notifications", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    guest_id: {
      type: "uuid",
      references: "guests",
      onDelete: "cascade",
    },
    title: {
      type: "text",
      notNull: false,
    },
    message: {
      type: "text",
      notNull: false,
    },
    type: {
      type: "varchar(50)",
      notNull: false,
      default: "info",
    },
    is_read: {
      type: "boolean",
      default: false,
    },
    datecreated: { type: "varchar(255)" },
    dateread: { type: "varchar(255)" },
  });
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.down = (pgm) => {
  pgm.dropTable("notifications");
};
