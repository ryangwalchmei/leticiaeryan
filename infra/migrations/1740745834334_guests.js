/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("guests", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    name: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(255)" },
    cell: { type: "varchar(255)" },

    is_family: { type: "boolean", default: false },
    is_friend: { type: "boolean", default: false },
    is_musician: { type: "boolean", default: false },
    is_witness: { type: "boolean", default: false },
    is_bridesmaid: { type: "boolean", default: false },
    is_bestman: { type: "boolean", default: false },
    is_bride: { type: "boolean", default: false },
    is_groom: { type: "boolean", default: false },

    guest_of: { type: "varchar(255)" },

    invitation_id: {
      type: "uuid",
      notNull: true,
      references: "invitation(id)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    confirmation_status: {
      type: "varchar(20)",
      default: "pendente",
    },
    confirmation_date: { type: "varchar(255)" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("guests");
};
