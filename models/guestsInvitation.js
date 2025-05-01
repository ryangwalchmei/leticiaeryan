import database from "../infra/database";

export default function GuestsInvitation() {
  async function getGuestsByInvitationId(id) {
    try {
      const returnQuery = await database.query({
        text: "SELECT * FROM guests WHERE invitation_id = $1",
        values: [id],
      });

      return returnQuery.rows;
    } catch (error) {
      if (error.code === "22P02") {
        return error;
      }
      throw error;
    }
  }

  return {
    getGuestsByInvitationId,
  };
}
