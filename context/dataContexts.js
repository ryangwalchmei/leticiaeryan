import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const DataContext = createContext();

async function fetchAPI(endpoint, options) {
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "An error occurred");
  }
  if (response.status === 204 || response.statusText === "No Content") {
    return null;
  }
  return response.json();
}

export const DataProvider = ({ children }) => {
  const {
    data: invitationList = [],
    isLoading: isLoadingInvitations,
    mutate: refreshInvitations,
  } = useSWR("/api/v1/invitation", fetchAPI);
  const {
    data: guestList = [],
    isLoading: isLoadingGuests,
    mutate: refreshGuests,
  } = useSWR("/api/v1/guests", fetchAPI);
  const { data: giftList = [], isLoading: isLoadingGifts } = useSWR(
    "/api/v1/gifts",
    fetchAPI,
  );

  const [mappedInvitations, setMappedInvitations] = useState([]);
  const [mappedGuests, setMappedGuests] = useState([]);

  useEffect(() => {
    const invitations = [...invitationList]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((invitation) => ({
        ...invitation,
        guests: guestList.filter(
          (guest) => guest.invitation_id === invitation.id,
        ),
      }));
    setMappedInvitations(invitations);
  }, [invitationList, guestList]);

  useEffect(() => {
    const guests = [...guestList]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((guest) => ({
        ...guest,
        invitation:
          invitationList.find((inv) => inv.id === guest.invitation_id) || {},
      }));
    setMappedGuests(guests);
  }, [guestList, invitationList]);

  const confirmationSummary = {
    invitation: {
      total: invitationList.length,
      confirmed: invitationList.filter((i) => i.status === "entregue").length,
      declined: invitationList.filter((i) => i.status === "não entregue")
        .length,
      pending: invitationList.filter((i) => i.status === "pendente").length,
    },
    guest: {
      total: guestList.length,
      confirmed: guestList.filter((g) => g.confirmation_status === "confirmed")
        .length,
      declined: guestList.filter((g) => g.confirmation_status === "declined")
        .length,
      pending: guestList.filter(
        (g) => !g.confirmation_status || g.confirmation_status === "pending",
      ).length,
    },
    gifts: {
      total: giftList.length,
      receivedCount: giftList.filter((g) => !g.available && g.received).length,
      available: giftList.filter((g) => g.available).length,
      pending: giftList.filter((g) => !g.available && !g.received).length,
    },
  };

  const loadingData = {
    isLoadingInvitations,
    isLoadingGuests,
    isLoadingGifts,
  };

  const refresh = () => ({
    refreshInvitations,
    refreshGuests,
  });

  return (
    <DataContext.Provider
      value={{
        invitationList,
        guestList,
        giftList,
        mappedInvitations,
        mappedGuests,
        confirmationSummary,
        loadingData,
        refresh,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
